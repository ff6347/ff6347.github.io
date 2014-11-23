---
layout: post
title: "BRIGHTNESS INDICATOR - PHOTOCELL WITH TWEAK "
date: 2011-10-09T12:29:00+02:00
tags:
- code
- fritzing
- arduino
tumblr_url: http://fabiantheblind.tumblr.com/post/11221723778/brightness-indicator-photocell-with-tweak
---
This setup takes the brightness from the photocell and displays it with 6 LEDs.

To get rid of the ambient light there is a potentiometer “The Tweak”.



The circuit:
LEDs from pins 2 through 7 to ground created 2006 by David A. Mellis modified 5 Jul 2009 by Tom Igoe This example code is in the public domain. http://www.arduino.cc/en/Tutorial/ForLoop

Photocell coming in on analog input based on examples from here http://www.ladyada.net/learn/sensors/cds.html

potentiometer coming in on analog input based on an example by Stefan Hermann http://fritzing.org/projects/color-fader/

get the code at the fritzing project page



/*
 
 The circuit:
 * LEDs from pins 2 through 7 to ground
 created 2006
 by David A. Mellis
 modified 5 Jul 2009
 by Tom Igoe 
 This example code is in the public domain.
 http://www.arduino.cc/en/Tutorial/ForLoop
 
 * Photocell coming in on analog input
   based on examples from here
   http://www.ladyada.net/learn/sensors/cds.html
 
 * potentiometer coming in on analog input
   based on an example by Stefan Hermann 
   http://fritzing.org/projects/color-fader/
 
 */

int photocellPin = 0;     // the cell and 10K pulldown are connected to a0
int photocellReading;     // the analog reading from the sensor divider
int timer = 100;           // The higher the number, the slower the timing.
int LEDbrightness;        // 

int sensorPin = 1; // this is the potentiometer on A1

int tweak; // this value is for tweakin the range of the photocell adjusting the ambient light


const int DEBUG = false;// This is for debug and never changes

void setup() {
  // use a for loop to initialize each used digital pin as an output:
  for (int thisPin = 2; thisPin < 8; thisPin++)  {
    pinMode(thisPin, OUTPUT);      
  }
      // for the console  
      if(DEBUG)Serial.begin(9600);   
}

void loop() {
  
  
  tweak = analogRead(sensorPin); // the potentiometer sends values between 1023 - 0
  
  photocellReading = analogRead(photocellPin);  // incoming from the photocell
      // LED gets brighter the darker it is at the sensor
  // that means we have to -invert- the reading from 0-1023 back to 1023-0
      photocellReading = 1023 - photocellReading;
          // some console / debugging stuff
          
    if(DEBUG){
          Serial.print("Analog reading on A0 = ");         
           Serial.println(photocellReading);     // the raw analog reading
           Serial.print("Analog reading on A1 = ");         
           Serial.println(tweak);     // the raw analog reading
           delay(1000);
  }
  
  // you need to tweak here based on your ambient light
  // so the values from the potentiometer are used to reduce the range
    LEDbrightness = abs(map(photocellReading, tweak, 1023, 0, 7));
    // some console / debugging stuff
    if(DEBUG){  
      Serial.print("Cell Read:");     
      Serial.println(photocellReading);
      Serial.print("LEDBrightnessVal: ");
      Serial.println(LEDbrightness);
      Serial.println(" ");
      delay(1000);
    }
    
    lightsBehavior(LEDbrightness); // turns the lights on and off depending on reding from potocell
  
}

/*
 * arg val is the brightness value mapped to the number of pins
 */
void lightsBehavior(int val){
    
  // these are the pins
pinLightCtrl(val,2,0); 
pinLightCtrl(val,3,1);
pinLightCtrl(val,4,2);
pinLightCtrl(val,5,3);
pinLightCtrl(val,6,4);
pinLightCtrl(val,7,5);
         
}

/*
 * arg val is the brightness value mapped to the number of pins (0 - 5)
 * arg int pin is the pin number
 * arg bggrThan if val is bigger than this value 
 */
void pinLightCtrl(int val, int pin, int bggrThan){

  if(val > bggrThan){  
    digitalWrite(pin, HIGH);
    }else{
    digitalWrite(pin, LOW);
    }
}


