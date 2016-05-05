var sound = require('nativescript-sound');
import {Color} from 'color';
import {Component, AfterViewInit, ViewChild, ElementRef} from "angular2/core";
import {Image} from "ui/image";
import {Label} from "ui/label";
import {AbsoluteLayout} from 'ui/layouts/absolute-layout';
import {topmost} from 'ui/frame';
import * as app from 'application';
import * as platform from 'platform';
import * as imageSource from 'image-source';

interface IRings {
    name: string;
    color: Color;
}

@Component({
    selector: "my-app",
    template: `
    <ActionBar title="Windchimes">
    </ActionBar>
    <AbsoluteLayout #windchimes width="100%" height="100%" (tap)="play($event)" (touch)="touch($event)">
        <!--<GridLayout rows="auto, auto, auto" columns="auto, *, auto, *">
            <Label text="X Coordinate: " row="0" col="0" class="white" textWrap="true"></Label>
            <Label [text]="xCoord" row="0" col="1" class="blue" textWrap="true"></Label>
            <Label text="Y Coordinate: " row="1" col="0" class="white" textWrap="true"></Label>
            <Label [text]="yCoord" row="1" col="1" class="blue" textWrap="true"></Label>
            <Label text="Chime: " row="2" col="0" class="white" textWrap="true"></Label>
            <Label [text]="chime" row="2" col="1" class="blue" textWrap="true"></Label>
        </GridLayout>-->

        <Image id="circle" src="~/images/circle.png" stretch="aspectFit" height="0"></Image>
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

    private createCirle(layout: AbsoluteLayout, x: number, y: number) {
        let circle = new Label;
        circle.height = 200;
        circle.width = 200;
        circle.borderRadius = 100;
        layout.addChild(circle);
        y = y - 100;
        x = x - 100;
        AbsoluteLayout.setTop(circle, y);
        AbsoluteLayout.setLeft(circle, x);

        return circle;
    }
    public play(e: any) {
        let randomChime = this.rings[Math.floor(Math.random() * this.rings.length)];
        this.sounds[randomChime.name].play();
        this.chime = randomChime.name;

        let circle = this.createCirle(this.layout, this.xCoord, this.yCoord);
        this.animateCircle(circle, randomChime.color);
    }

    private animateCircle(circle: Label, ringColor: Color) {
        circle.animate({
            scale: { x: 20, y: 20 },
            backgroundColor: ringColor,
            opacity: 0.1,
            duration: 3700
        }).then(() => {
            this.layout.removeChild(circle);
            // circle.visible = 'collapse';
        });
    }

    ngAfterViewInit() {
        //I probably should have done this with @ViewChild...
        this.layout = this.windchimes.nativeElement;// <AbsoluteLayout>topmost().currentPage.getViewById('windchimes');
    }
}