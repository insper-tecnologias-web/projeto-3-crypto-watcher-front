import Image from "next/image";


export default function Footer() {
    const logoStyle = {

        height: "1em",
        marginLeft: "0.5rem",
    };
    const footerStyle = {
        display: "flex",
        flex: 1,
        padding: "2rem 0",
        borderTop: "1px solid #eaeaea",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <footer style={footerStyle}>
            <a
                style={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}
                href="https://github.com/insper-tecnologias-web/projeto-3-crypto-watcher-front"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' GRPG'}
                <span style={logoStyle}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </footer>
    );
}