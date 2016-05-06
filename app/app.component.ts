let sound = require('nativescript-sound');
let explosion = require("nativescript-explosionfield");
import {Color} from 'color';
import {Component, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {Image} from "ui/image";
import {Label} from "ui/label";
import {AbsoluteLayout} from 'ui/layouts/absolute-layout';
import {topmost} from 'ui/frame';
import * as app from 'application';
import * as platform from 'platform';
import * as imageSource from 'image-source';
import * as animationsModule from 'ui/animation';

interface IRings {
    name: string;
    color: Color;
}

@Component({
    selector: "my-app",
    template: `
    <ActionBar title="Wind Chimes">
    </ActionBar>
    <AbsoluteLayout #windchimes width="100%" height="100%" (tap)="play($event)" (touch)="touch($event)">
        <!-- DEBUG: uncomment below -->
        <!--<GridLayout rows="auto, auto, auto" columns="auto, *, auto, *">
            <Label text="X Coordinate: " row="0" col="0" class="white" textWrap="true"></Label>
            <Label [text]="xCoord" row="0" col="1" class="blue" textWrap="true"></Label>
            <Label text="Y Coordinate: " row="1" col="0" class="white" textWrap="true"></Label>
            <Label [text]="yCoord" row="1" col="1" class="blue" textWrap="true"></Label>
            <Label text="Chime: " row="2" col="0" class="white" textWrap="true"></Label>
            <Label [text]="chime" row="2" col="1" class="blue" textWrap="true"></Label>
        </GridLayout>-->
    </AbsoluteLayout>
    `
})
export class AppComponent implements AfterViewInit {
    @ViewChild('windchimes') windchimes: ElementRef;
    public chime: any;
    public xCoord: any;
    public yCoord: any;
    private layout: AbsoluteLayout;

    constructor() {
        if (app.android) {
            // Change statusbar color on Lollipop
            if (platform.device.sdkVersion >= "21") {
                var window = app.android.startActivity.getWindow();
                window.setStatusBarColor(new Color("#000").android);
            }
        }


        if (topmost().ios) {
            let navigationBar = topmost().ios.controller.navigationBar;
            // 0: default
            // 1: light
            navigationBar.barStyle = 1;
        }
    }

    private sounds: any = {
        "C4": sound.create("~/sounds/n_C4.mp3"),
        "C5": sound.create("~/sounds/n_C5.mp3"),
        "D4": sound.create("~/sounds/n_D4.mp3"),
        "D5": sound.create("~/sounds/n_D5.mp3"),
        "E5": sound.create("~/sounds/n_E5.mp3"),
        "F4": sound.create("~/sounds/n_F4.mp3"),
        "G4": sound.create("~/sounds/n_G4.mp3"),
    };

    // Array of sound names and their colors
    private rings: IRings[] = [
        { name: 'C4', color: new Color("#FF3D7F") },
        { name: 'C5', color: new Color("#FF9E9D") },
        { name: 'D4', color: new Color("#DAD8A7") },
        { name: 'D5', color: new Color("#7FC7AF") },
        { name: 'E5', color: new Color("#3FB8AF") }
    ];

    public touch(e: any) {
        console.log(`touch`);
        console.log(e);
        if (e && e.action === 'down') {
            this.xCoord = e.getX();
            this.yCoord = e.getY();
            console.log(`x: ${this.xCoord} / y: ${this.yCoord}`);
        }
    }

    private createCirle(layout: AbsoluteLayout, x: number, y: number, ringColor: Color) {
        let circle = new Label;
        let hole = new Label;
        let bomb;

        circle.height = 200;
        circle.width = 200;
        circle.borderRadius = 100;
        circle.backgroundColor = ringColor;

        hole.height = 40;
        hole.width = 40;
        hole.borderRadius = 20;
        hole.backgroundColor = new Color('#000');
        hole.opacity = 0.75;

        layout.addChild(circle);
        layout.addChild(hole);

        y = y - 100;
        x = x - 100;
        AbsoluteLayout.setTop(circle, y);
        AbsoluteLayout.setLeft(circle, x);

        AbsoluteLayout.setTop(hole, y + 80);
        AbsoluteLayout.setLeft(hole, x + 80);

        // Create the bomb only on Android        
        if (app.android) {
            bomb = new Label;

            bomb.height = 5;
            bomb.width = 5;
            bomb.borderRadius = 2.5;
            bomb.backgroundColor = new Color("#fff");

            layout.addChild(bomb);

            AbsoluteLayout.setTop(bomb, y + 98);
            AbsoluteLayout.setLeft(bomb, x + 98);
        }

        this.animateCircle(circle, hole, bomb, ringColor);
    }

    public play(e: any) {
        let randomChime = this.rings[Math.floor(Math.random() * this.rings.length)];
        this.sounds[randomChime.name].play();
        this.chime = randomChime.name;

        this.createCirle(this.layout, this.xCoord, this.yCoord, randomChime.color);
    }

    private animateCircle(circle: Label, hole: Label, bomb: Label, ringColor: Color) {

        // Explode only on Android        
        if (app.android) {
            setTimeout(function () {
                explosion.explode(bomb);
            });
        }

        
        let definitions = new Array();
        definitions.push({
            target: circle,
            scale: { x: 20, y: 20 },
            opacity: 0.1,
            duration: 3700
        });
        definitions.push({
            target: hole,
            scale: { x: 20, y: 20 },
            opacity: 0.1,
            duration: 3700
        });

        let animationSet = new animationsModule.Animation(definitions, false);

        animationSet.play().then(function () {
            console.log("Animation finished");
        }).then(() => {
            this.layout.removeChild(bomb);
            this.layout.removeChild(hole);
            this.layout.removeChild(circle);
        });
    }

    ngAfterViewInit() {
        this.layout = <AbsoluteLayout>this.windchimes.nativeElement;
    }
}