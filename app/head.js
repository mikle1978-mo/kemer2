export default function Head() {
    return (
        <>
            {/* <title>Create Next App</title> */}
            <meta
                content='width=device-width, initial-scale=1'
                name='viewport'
            />
            <link rel='icon' href='/favicon.ico' />

            <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
                precedence='default'
            />
            {/* <!-- Google tag (gtag.js) --> */}
            <script
                async
                src='https://www.googletagmanager.com/gtag/js?id=G-RBNVCFN9DR'
            ></script>
            <script>
                dangerouslySetInnerHTML=
                {{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag()
                {dataLayer.push(arguments)}
                gtag('js', new Date()); gtag('config', 'G-RBNVCFN9DR');
                `,
                }}
            </script>
        </>
    );
}
