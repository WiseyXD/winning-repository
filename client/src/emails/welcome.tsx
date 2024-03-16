import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";

interface NotionMagicLinkEmailProps {
    loginCode?: string;
    malpracticeDetails: string;
    date: string;
    time: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const NotionMagicLinkEmail = ({
    loginCode,
    malpracticeDetails,
    date,
    time,
}: NotionMagicLinkEmailProps) => (
    <Html>
        <Head />
        <Preview>Malpractice Detected</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Malpractice Detected</Heading>

                <Text
                    style={{
                        ...text,
                        color: "#333", // Changed font color to black
                        marginTop: "14px",
                        marginBottom: "16px",
                    }}
                >
                    {malpracticeDetails}
                </Text>
                <Text
                    style={{
                        ...text,
                        color: "#333", // Changed font color to black
                        marginTop: "12px",
                        marginBottom: "38px",
                    }}
                >
                    Date: {date}, Time: {time}
                </Text>
                <Img
                    src={`${baseUrl}/static/notion-logo.png`}
                    width="32"
                    height="32"
                    alt="Notion's Logo"
                />
                <Text style={footer}>
                    <Link
                        href="#"
                        target="_blank"
                        style={{ ...link, color: "#2754C5" }} // Changed link color
                    >
                        proctor.ai
                    </Link>
                    , the all-in-one-testspace
                    <br />
                    for your Exams
                </Text>
            </Container>
        </Body>
    </Html>
);

NotionMagicLinkEmail.PreviewProps = {
    loginCode: "sparo-ndigo-amurt-secan",
    malpracticeDetails: "User was not showing face to the camera.",
    date: "2024-03-16",
    time: "14:30:00",
} as NotionMagicLinkEmailProps;

export default NotionMagicLinkEmail;

const main = {
    backgroundColor: "#ffffff",
};

const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
};

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
};

const link = {
    color: "#2754C5",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const footer = {
    color: "#898989",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    lineHeight: "22px",
    marginTop: "12px",
    marginBottom: "24px",
};
