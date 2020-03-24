#include <Arduino.h>

/* 

MicroSD Card Read / Write
This example shows how to read and write data to and from a MicroSD card file

The circuit:
SD card attached to SPI bus as follows:

MOSI - pin 11
MISO - pin 12
CLK  - pin 13
CS   - pin 9

*/

#include <SPI.h>
#include <SD.h>
#include <Wire.h>
#include "RTClib.h"

RTC_DS1307 RTC;
File myFile;
DateTime now;

void setup()
{
  Wire.begin();
  RTC.begin();
  // Open serial communications and wait for port to open:
  if (!RTC.isrunning())
  {
    Serial.println("RTC is NOT running!");
    // This will reflect the time that your sketch was compiled
    RTC.adjust(DateTime(__DATE__, __TIME__));
  }
  now = RTC.now();
  Serial.begin(9600);
  while (!Serial)
  {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.print("Initializing SD card... ");
  if (!SD.begin(9))
  {
    Serial.println("Initialization failed");
    return;
  }
  Serial.println("Initialization done");

  // Open the file. note that only one file can be open at a time,
  // so you have to close this one before opening another.
}

void loop()
{
  // Nothing happens after setup
  if (Serial.available())
  {
    if (Serial.read() == 'n')
    {
      myFile = SD.open("testsd.txt", FILE_WRITE);
    
    // If the file opened okay, write to it:
      if (myFile)
      {
        Serial.print("Writing to testsd.txt...");
        // ____________________________________________
        myFile.println("Hello World!");
        // close the file:
        myFile.close();
        Serial.println("Done");
      }
      else
      {
        // If the file didn't open, print an error:
        Serial.println("Error opening testsd.txt");
      }
      Serial.println("MOIS.txt:");
      myFile = SD.open("testsd.txt");

      if (myFile)
      {
        Serial.println("testsd.txt:");
        // Read from the file until there's nothing else in it:
        while (myFile.available())
        {
          Serial.write(myFile.read());
        }
        // Close the file:
        myFile.close();
      }
      else
      {
        // if the file didn't open, print an error:
        Serial.println("Error opening testsd.txt");
      }
    }

    // Re-open the file for reading:
    if (Serial.read()=='r')
    {
      Serial.println("MOIS.txt:");
      myFile = SD.open("testsd.txt");
      if (myFile)
      {
        Serial.println("testsd.txt:");
        // Read from the file until there's nothing else in it:
        while (myFile.available())
        {
          Serial.write(myFile.read());
        }
        // Close the file:
        myFile.close();
      }
      else
      {
        // if the file didn't open, print an error:
        Serial.println("Error opening testsd.txt");
      }
    }
  }
}