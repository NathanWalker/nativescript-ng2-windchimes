var sound = require('nativescript-sound');
import {Color} from 'color';
import {Component, OnInit} from "angular2/core";
import {topmost} from 'ui/frame';
import * as app from 'application';
import * as platform from 'platform';

@Component({
    selector: "my-app",
    template: `
    <ActionBar title="Windchimes">
    </ActionBar>
    <StackLayout (tap)="play($event)" (touch)="touch($event)">        
        <GridLayout rows="auto, auto, auto" columns="auto, *, auto, *">
            <Label text="X Coordinate: " row="0" col="0" class="white" textWrap="true"></Label>
            <Label [text]="xCoord" row="0" col="1" class="blue" textWrap="true"></Label>
            <Label text="Y Coordinate: " row="1" col="0" class="white" textWrap="true"></Label>
            <Label [text]="yCoord" row="1" col="1" class="blue" textWrap="true"></Label>   
            <Label text="Chime: " row="2" col="0" class="white" textWrap="true"></Label>
            <Label [text]="chime" row="2" col="1" class="blue" textWrap="true"></Label>         
        </GridLayout>   

        <Image id="circle" src="~/images/circle.png" stretch="aspectFit" height="0"></Image>
    </StackLayout>
`,
})
export class AppComponent implements OnInit {
    public chime: any;
    public xCoord: any;
    public yCoord: any;

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
    private rings: any = [
        { name: 'C4', color: new Color("#FF3D7F") },
        { name: 'C5', color: new Color("#FF9E9D") },
        { name: 'D4', color: new Color("#DAD8A7") },
        { name: 'D5', color: new Color("#7FC7AF") },
        { name: 'E5', color: new Color("#3FB8AF") }
    ];

    constructor() {
        if (app.android) {
            // Change statusbar color on Lollipop
            if (platform.device.sdkVersion >= "21") {
                var window = app.android.startActivity.getWindow();
                window.setStatusBarColor(new Color("#000").android);
            }
        }
    }

    public touch(e: any) {
        console.log(`touch`);
        console.log(e);
        if (e && e.action === 'down') {
            this.xCoord = e.getX();
            this.yCoord = e.getY();
            console.log(`x: ${this.xCoord} / y: ${this.yCoord}`);
        }
    }

    public play(e: any) {
        let randomChime = this.rings[Math.floor(Math.random() * this.rings.length)];
        this.sounds[randomChime.name].play();
        this.chime = randomChime.name;

        let circle = topmost().currentPage.getViewById('circle');
        this.animateCircle(circle, randomChime.color);
    }

    private animateCircle(circle: any, ringColor: any) {
        circle.animate({
            scale: { x: 50, y: 50 },
            backgroundColor: ringColor,
            opacity: 0.1,
            duration: 3700
        }).then(() => {
            circle.visible = 'collapse';
        })
    }

    ngOnInit() {

    }
}