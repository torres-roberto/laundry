
// This #include statement was automatically added by the Particle IDE.
#include <clickButton.h>

#include "InternetButton/InternetButton.h"
#include "math.h"

InternetButton b = InternetButton();

// int positions[3] = { 0, 0, 0 };

/**
* Declaring the variables.
*/
unsigned int nextTime = 0;    // Next time to contact the server

// the Button
const int buttonPin1 = 4;
ClickButton button1(buttonPin1, LOW, CLICKBTN_PULLUP);

// Button results 
int function = 0;

bool _isRunning = false;

void setup() {
    //Tell b to get everything ready to go
    // Use b.begin(1); if you have the original SparkButton, which does not have a buzzer or a plastic enclosure
    // to use, just add a '1' between the parentheses in the code below.
    b.begin();
    Serial.begin(9600);
    
    pinMode(D4, INPUT_PULLUP);

    // Setup button timers (all in milliseconds / ms)
    // (These are default if not set, but changeable for convenience)
    button1.debounceTime   = 20;   // Debounce timer in ms
    button1.multiclickTime = 250;  // Time limit for multi clicks
    button1.longClickTime  = 1000; // time until "held-down clicks" register
}

void loop() {
    //https://launevent.servicebus.windows.net//messages
    // Endpoint=sb://launevent.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=g39mZsoPNPjG60i5My+Qqam9AuxJpbYZTKQp9dqBUyQ=
    button1.Update();

    // Save click codes in LEDfunction, as click codes are reset at next Update()
    if(button1.clicks != 0) function = button1.clicks;
    
    if(function == 1 || function == -1) {
        Serial.println("SINGLE click");
        
        if (_isRunning) {
            NotifyOn();
        }
        else {
            NotifyOff();
        }
    }
    
    if((function == 2 || function == -2) && !_isRunning) {
        Serial.println("Double click");
        _isRunning = true;
        NotifyOn();
    }
    
    if((function == 3 || function == -3) && _isRunning)  {
        Serial.println("Triple click");
        _isRunning = false;
        NotifyOff();
    }
    
    function = 0;
    delay(5000);
    //Particle.publish("movement", "jkl", PRIVATE);
}

void NotifyOff() {
    b.allLedsOn(178,34,34);
    delay(1000);
    b.allLedsOff();
}

void NotifyOn() {
    b.allLedsOn(0,20,20);
    delay(1000);
    b.allLedsOff();
}





    
    //This will make the color of the Button change with what direction you shake it
    //The abs() part takes the absolute value, because negatives don't work well
    //b.allLedsOn(abs(xValue), abs(yValue), abs(zValue));
    /*int x = b.readX();
    int y = b.readY();
    int z = b.readZ();

    if (isStartup() && _setupReady == false) {
        bool machineIsReady = isReadyToTrackLoad();
        
        if (!machineIsReady) {
            _setupReady = false;
            delay(1000);
            return;
        }
        
        _setupReady = true;
        blinkReadyLight();
    }

    if (hasMoved(x,y,z) && _setupReady == true && _inProgress == false) {
        _inProgress = true;
        // Report when this load has started
        //int[] range = getRange(x,y,z);
        //reportRange(range);
        _isDone = isLoadComplete(x, y, z);
    } 
    else if (hasMoved(x,y,z) && _inProgress == true) {
        //int[] range = getRange(x,y,z);
        //reportRange(range);
        _isDone = isLoadComplete(x,y,z);
    }
    
    if (_isDone) {
        notify();
        cleanup();
    }
    */
    //delay(1000);

