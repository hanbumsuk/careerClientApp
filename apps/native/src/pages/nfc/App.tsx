import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Linking,
} from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export default function App() {
  const [hasNfc, setHasNfc] = useState<boolean | null>(null);

  useEffect(() => {
    

    NfcManager.start();
    const checkNfc = async () => {
      const isSupported = await NfcManager.isSupported();
      setHasNfc(isSupported);

      if (isSupported) {
        const isEnabled = await NfcManager.isEnabled();
        if (isEnabled) {
          Alert.alert(
            'NFC 비활성화',
            'NFC 기능이 꺼져 있습니다. 설정에서 NFC를 활성화하세요',
          );
        }
      }
    };
    checkNfc();
  }, []);

  const readNdef = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const writeNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord('Hello, NFC!!!'),
        Ndef.uriRecord('https://www.google.com'),
      ]);
      // await NfcManager.writeNdefMessage(bytes);
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      Alert.alert('Success', 'NFC Tag written successfully!');
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        console.log(ex.toString());
        Alert.alert('NFC 쓰기 오류입니다.', ex.toString());
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (hasNfc === null) {
    return <Text>NFC 지원 여부 확인중 ... </Text>;
  } else if (!hasNfc) {
    return <Text>이 장치는 NFC를 지원하지 않습니다.</Text>;
  }

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.buttonWrapper}>
          <View>
            <TouchableOpacity onPress={readNdef}>
              <Button title="Read NFC" />
            </TouchableOpacity>
          </View>
          <View>
            <Button title="Write NFC" onPress={writeNfc} />
          </View>
        </View>
      </View>
    </>
  );
}

export async function readNdef() { // readNdef 함수를 밖으로 빼서 export
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    console.warn('Tag found', tag);
  } catch (ex) {
    console.warn('Oops!', ex);
  } finally {
    // stop the nfc scanning
    NfcManager.cancelTechnologyRequest();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 30,
  },
  webViewWrapper: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  nfcButton: {
    width: 40,
    height: 30,
    backgroundColor: 'red',
    color: 'white',
  },
});