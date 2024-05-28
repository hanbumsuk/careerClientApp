"use client";

import { Button } from "@repo/ui";

import styles from "../styles/index.module.css";
import { useRouter } from "next/navigation";
import nfc from '../../native/src/pages/nfc/App';

declare global {
  interface Window {
    ReactNativeWebView: any
  }

}

export default function Web() {

  const route = useRouter();

  const submitTest = async () => {
    //await route.push("https://career-client-web-view-career-client.vercel.app:8081");
    //window.location.href = "careerMobile://open";
    //window.location.href = "intent://open#Intent;scheme=careerMobile;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.careermobile;end";
    window.ReactNativeWebView.postMessage('readNdef');
  }

  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={submitTest} text="Boop" />
    </div>
  );
}
