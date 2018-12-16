
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


int _buttonClicks = 0;

bool _isRunning = false;

int _currentTumble = 0;
int TUMBLE_INTERVAL = 10000;
int RESET_TUMBLE = 0;

int LOOP_INTERVAL = 5;

void setup() {
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
    button1.Update();
    
    // Save click codes in LEDfunction, as click codes are reset at next Update()
    if(button1.clicks != 0) _buttonClicks = button1.clicks;
    
    if (CheckClicks(_buttonClicks, 1)) {
        if (_isRunning) {
            NotifyOn();
        }
        else {
            NotifyOff();
        }
    }
    
    if (CheckClicks(_buttonClicks, 2) && !_isRunning) {
        _isRunning = true;
        _currentTumble = RESET_TUMBLE;
        NotifyOn();
    }
    
    if (CheckClicks(_buttonClicks, 3) && _isRunning)  {
        _isRunning = false;
        _currentTumble = RESET_TUMBLE;
        NotifyOff();
    }
    
    if (_isRunning && CheckClicks(_buttonClicks, 0)) {
        publishMovement();
    }
    
    _buttonClicks = 0;
    delay(LOOP_INTERVAL);
}

void publishMovement() {
    int x = b.readX();
    int y = b.readY();
    int z = b.readZ();
    
    if (_currentTumble > TUMBLE_INTERVAL) {
        String position = String("x: ") + String(x) + String(",y: ") + String(y) + String(",z: ") + String(z);
        Particle.publish("movement", position, PRIVATE);
        _currentTumble = RESET_TUMBLE;
    }
    
    _currentTumble += LOOP_INTERVAL;
}

bool CheckClicks(int actualClicks, int expectedClicks) {
    int negExpectedClicks = -1 * expectedClicks;
    
    if (actualClicks == expectedClicks || 
        actualClicks == negExpectedClicks) {
        Serial.println(String("Clicks: ") + String(expectedClicks));
        return true;
    }
    return false;
}

void NotifyOff() {
    b.allLedsOn(178,34,34);
    delay(1000);
    b.allLedsOff();
    Particle.publish("movement", "Turned Off", PRIVATE);
}

void NotifyOn() {
    b.allLedsOn(0,20,20);
    delay(1000);
    b.allLedsOff();
    Particle.publish("movement", "Turned ON", PRIVATE);
}