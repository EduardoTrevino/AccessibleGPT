import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

export default function App() {
  Speech.speak('Hello, world!');
  const [recording, setRecording] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handlePress = async () => {
    // Make a POST request to the backend API
    const response = await fetch('http://localhost:5000/api/generate-text', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'Some input text'
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    // Get the generated text from the response
    const data = await response.json();
    setGeneratedText(data.generated_text);
  };

  async function handleButtonPress() {
    if (recording) {
      // Stop recording
      await Audio.stopRecordingAsync();
      setRecording(false);
    } else {
      // Start recording
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const recording = new Audio.Recording();
        try {
          await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recording.startAsync();
          setRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Permission to access microphone denied');
      }
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile GPT</Text>
      <Button title="Generate Text" onPress={handlePress} />
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={handleButtonPress} />
      <Text style={styles.generatedText}>{generatedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  generatedText: {
    marginTop: 16,
    textAlign: 'center',
  },
});
