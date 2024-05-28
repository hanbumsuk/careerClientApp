import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { WebView } from 'react-native-webview';

export async function Native() {

  const LOCAL_IP = '192.168.2.58';
  const WEB_URL = `http://${LOCAL_IP}:3000`;

  const handleWebViewMessage = (event : any) => {
    const message = event.nativeEvent.data;
    // Handle message from WebView
    console.log('Received message from WebView:', message);
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
