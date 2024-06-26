import { StyleSheet, Text, View, Linking  } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { WebView } from 'react-native-webview';
import App from '../native/src/pages/nfc/App';

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

export default function Native() {

  const LOCAL_IP = '192.168.2.58';
  const WEB_URL = `http://${LOCAL_IP}:3000`;

  const handleWebViewMessage = async (event: any) => {
    const message = event.nativeEvent.data;
    if (message == 'readNdef') {
      console.log("message ", message);
      await Linking.openURL("http://google.com/");
      //await Linking.openURL("intent://open#Intent;scheme=careerMobile;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.careermobile;end")
    
    }
  };

  return (
    <WebView source={{ uri: WEB_URL }}
      onMessage={handleWebViewMessage}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewWrapper: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
