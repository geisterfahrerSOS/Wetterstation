#include <Arduino.h>
#include <Wire.h>
#include "RTClib.h"

RTC_DS1307 RTC;
long ST1 = 0;

void setup()
{
  Serial.begin(9600);
  Wire.begin();
  RTC.begin();
  // Check to see if the RTC is keeping time.  If it is, load the time from your computer.
  if (!RTC.isrunning())
  {
    Serial.println("RTC is NOT running!");
    // This will reflect the time that your sketch was compiled
    RTC.adjust(DateTime(__DATE__, __TIME__));
  }
  RTC.adjust(DateTime(__DATE__, __TIME__));
}
void loop()
{

  while (millis() - ST1 > 1000)
  {
    DateTime now = RTC.now();
    Serial.print(now.month(), DEC
    Serial.print('/');
    Serial.print(now.day(), DEC);
    Serial.print('/');
    Serial.print(now.year(), DEC);
    Serial.print(' ');
    Serial.print(now.hour(), DEC);
    Serial.print(':');
    Serial.print(now.minute(), DEC);
    Serial.print(':');
    Serial.print(now.second(), DEC);
    Serial.println();
    ST1 = millis();
  }
}