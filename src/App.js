import "./App.css";
import {
  VechaiProvider,
  Button,
  extendTheme,
  colors,
  Image,
  Spinner,
} from "@vechaiui/react";
import { useState } from "react";

const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

export const pale = {
  id: "pale",
  type: "dark",
  colors: {
    bg: {
      base: colors.blueGray["800"],
      fill: colors.blueGray["900"],
    },
    text: {
      foreground: colors.blueGray["100"],
      muted: colors.blueGray["300"],
    },
    primary: colors.violet,
    neutral: colors.blueGray,
  },
};

const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    cool,
    pale
  },
});

function App() {
  const [gif, setGif] = useState(null);
  const [message, setMessage] = useState("");
  const [imageStyle, setImageStyle] = useState({ display: "none" });
  const [loading, setLoading] = useState(false);

  const vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) - 120;
  const footer = {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: `${vh}px`,
  };

  const handleClick = () => {
    setLoading(true);
    setImageStyle({ display: "none" });
    setMessage(getMessage());
    
    fetch("https://gifrandom.herokuapp.com/api/v1/gif")
      .then((response) => response.json())
      .then((json) => {
        setGif(json.gif.url);
      });
  };

  var messages = [
    "Mañana te vas a sentir asi",
    "Este año te depara lo siguiente",
    "Tu suerte estos dias va a ser asi",
    "El amor en tu vida es asi",
    "Tus amigos creen que sos asi",
    "Tus estudios van a ser asi",
    "Asi sos en la noche",
    "Asi sos en el dia",
    "Como sos con la comida",
    "Como te sentis con la gente",
  ];

  const getMessage = () => {
    var newMessage = messages[Math.floor(Math.random() * messages.length)];
    return newMessage;
  };

  const handleImageLoaded = () => {
    setImageStyle({ display: "block" });
    setLoading(false);
  };

  const handleImageErrored = () => {
    setImageStyle({ display: "none" });
    setLoading(false);
  };

  return (
    <VechaiProvider theme={theme} colorScheme="pale">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          Ver mi suerte
        </Button>
        {gif ? (
          <div>
            <p className="flex justify-center align-center"  style={{marginBottom:'30px', fontSize: '2rem', textAlign: 'center'}}>{message}</p>
            <Image
              style={imageStyle}
              alt="image"
              htmlWidth={400}
              htmlHeight={400}
              className="object-cover"
              src={gif}
              onLoad={() => {
                handleImageLoaded();
              }}
              onError={() => {
                handleImageErrored();
              }}
            />
            <div className="flex justify-center align-center" style={{marginTop:'30px'}}>
              {!loading || <Spinner className="text-primary-500" />}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center align-center" style={footer}>
        by kintell33
      </div>
    </VechaiProvider>
  );
}

export default App;
