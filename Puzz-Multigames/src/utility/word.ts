import { useMemo } from "react";

type dictionaryAPIResponse =
  | {
      word: string;
      meanings: {
        definitions: {
          definition: string;
        }[];
      }[];
    }[]
  | undefined;

export type isWordValid = {
  word: string;
  definition: string;
} | null;

export const useDictionaryApi = () => {
  const dictionaryapi = useMemo(
    () => ({
      checkWordIsValid(word: string): Promise<isWordValid> {
        return new Promise((resolve) => {
          if (word === "" || word === null) {
            resolve(null);
            return;
          }
          // Para português, aceitamos qualquer palavra de 5 letras por enquanto
          // ou podemos validar contra o banco futuramente.
          if (word.length === 5) {
            resolve({
              word,
              definition: "Palavra em português encontrada!",
            });
          } else {
            resolve(null);
          }
        });
      },
      generateWord(): Promise<string> {
        return new Promise(async (resolve) => {
          try {
            await fetch("/assets/wordle-bank.txt")
              .then((response) => response.text())
              .then((result) => {
                const wordArr = result.split("\n");
                let todaysWord =
                  wordArr[Math.floor(Math.random() * wordArr.length)];
                resolve(todaysWord.replace(/\r\n|\r|\n/gm, ""));
              });
          } catch (error) {
            resolve("hello");
            throw new Error(
              "Unable to load word-bank file check internet connection",
            );
          }
        });
      },
    }),
    [],
  );

  return dictionaryapi;
};

export function useCypherText() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const encryptText = (text: string) => {
    let encryptedWord = "";
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const index = alphabet.indexOf(letter);
      if (index !== -1) {
        const encryptedLetter = alphabet[(index + 1) % alphabet.length];
        encryptedWord += encryptedLetter;
      } else {
        encryptedWord += letter;
      }
    }
    return encryptedWord;
  };
  const decryptText = (encryptedText: string) => {
    let decryptedWord = "";
    for (let i = 0; i < encryptedText.length; i++) {
      const letter = encryptedText[i];
      const index = alphabet.indexOf(letter);
      if (index !== -1) {
        const decryptedLetter =
          alphabet[(index - 1 + alphabet.length) % alphabet.length];
        decryptedWord += decryptedLetter;
      } else {
        decryptedWord += letter;
      }
    }
    return decryptedWord;
  };
  return { encryptText, decryptText };
}
