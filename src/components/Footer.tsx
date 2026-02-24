import { getSettings } from "@/lib/cms/storage";
import { FooterClient } from "./FooterClient";

export async function Footer() {
    const settings = await getSettings();

    return <FooterClient settings={settings} />;
}
