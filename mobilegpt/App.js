import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => console.log('Speech started');
    Voice.onSpeechEnd = () => console.log('Speech ended');
    Voice.onSpeechResults = (event) => {
      const inputText = event.value[0];
      console.log('Transcribed text:', inputText);

      // You can now send the inputText to your backend for processing
    };
    Voice.onSpeechError = (error) => console.error('Speech recognition error:', error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handlePress = async () => {
    try {
      // Make a POST request to the backend API
      const response = await fetch('http://<Your-ip-address>:5000/api/generate-text', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'Some input text',
        }),
      });

      // Get the generated text from the response
      const data = await response.json();
      setGeneratedText(data.generated_text);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonPress = async () => {
    if (isRecognizing) {
      await Voice.stop();
      setIsRecognizing(false);
    } else {
      try {
        await Voice.start('en-US');
        setIsRecognizing(true);
      } catch (error) {
        console.error('Voice recognition error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile GPT</Text>
      <Button title="Generate Text" onPress={handlePress} />
      <Button title={isRecognizing ? 'Stop Recording' : 'Start Recording'} onPress={handleButtonPress} />
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
