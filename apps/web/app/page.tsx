"use client";

import { Button } from "@repo/ui";

import styles from "../styles/index.module.css";
import { useRouter } from "next/navigation";

export default function Web() {

  const route = useRouter();

  const submitTest = async () => {
    await route.push("https://career-client-web-view-career-client.vercel.app:8081");
  }

  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={submitTest} text="Boop" />
    </div>
  );
}
