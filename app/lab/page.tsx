import type { Metadata } from "next"
import Lab from "./lab"

export const metadata: Metadata = { title: "Rishit Bafna | Lab", robots: { index: false } }

export default function Page() {
  return <Lab />
}
