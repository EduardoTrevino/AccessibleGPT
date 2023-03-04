import pyaudio
import speech_recognition as sr


# Create an instance of Pyaudio
audio = pyaudio.PyAudio()

# Set up the microphone input
stream = audio.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)

# Create a speech recognizer object
recognizer = sr.Recognizer()

# Continuously capture audio and print recognized speech in real-time
while True:
    # Read audio data from the microphone
    audio_data = stream.read(1024)

    # Convert the audio data to speech
    try:
        audio_data = sr.AudioData(audio_data, 44100, 2)  # Create an AudioData object from the raw audio data
        text = recognizer.recognize_google(audio_data)
        print("Recognized speech: ", text)
    except sr.UnknownValueError:
        print("Could not recognize speech")

# Convert the audio data to speech
# try:
#     audio_data = sr.AudioData(audio_data, 44100, 2)  # Create an AudioData object from the raw audio data
#     text = recognizer.recognize_google(audio_data)
#     print("Recognized speech: ", text)
# except sr.UnknownValueError:
#     print("Could not recognize speech")

