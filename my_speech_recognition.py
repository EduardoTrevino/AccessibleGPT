import pyaudio
import speech_recognition as sr
import os 
import pyttsx3
# create a speech recognition object
r = sr.Recognizer()

# create a pyaudio instance
engine = pyttsx3.init()

with sr.Microphone() as source:
    print("Recognizing...")
    # read the audio data from the default microphone
    audio_data = r.record(source, duration=10)
    # convert speech to text
    text = r.recognize_google(audio_data)
    print(text)
# say the recognized text
engine.say(text)
engine.runAndWait()
