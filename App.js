import React, { useState } from "react";
import {
  Text,
  Center,
  Heading,
  NativeBaseProvider,
  extendTheme,
  VStack,
  FormControl,
  Input,
  Pressable,
} from "native-base";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { child, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

import { firebase } from "./src/firebase/connection";

import { Loading } from "./src/components/Loading";

const auth = getAuth(firebase);
const database = getDatabase(firebase);

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState('');

  async function novoUser(uid, novoNome) {
    const newUserRef = child(ref(database, 'usuarios/'), uid);
    //console.log(newUserRef.key);
    await set(newUserRef, {
      nome: novoNome
    });
  }

  async function cadastrar() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        setUser(user);

        novoUser(uid, nome)
        alert("Usuário Cadastrado com sucesso!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          alert('Senha menor que 6 caracteres')
          return;
        }
        if (errorCode === 'auth/invalid-email') {
          alert('Email Inválido')
          return;
        }
        else {
          alert('Ops, algo deu errado!')
          return;
        }
        // ..
      });

    await updateProfile(auth.currentUser, {
      displayName: nome,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!

    }).catch((error) => {
      console.log(error);
    });

    //console.log(user)
    setNome('');
    setEmail('');
    setSenha('');
  }

  async function logar() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert(user.email)
        setUser(user);
        console.log(user)
        setNome('');
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert('Ops, algo deu errado!')
        return;

        // ..
      });

  }

  async function deslogar() {
    await signOut(auth).then(() => {
      setUser(null);
      alert('Usuário deslogado!')
      return;
    }).catch((error) => {
      alert('Ops, algo deu errado!')
      return;
    });
  }

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={3} alignItems="center">
          <Heading size="lg">Cadastro Usuários</Heading>
          <FormControl w="90%" maxW="300px">
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              variant="rounded"
              placeholder="Nome"
              borderColor="coolGray.600"
              onChangeText={(texto) => setNome(texto)}
              value={nome}
            />
          </FormControl>
          <FormControl w="90%" maxW="300px">
            <FormControl.Label>Email</FormControl.Label>
            <Input
              variant="rounded"
              placeholder="Email"
              borderColor="coolGray.600"
              onChangeText={(texto) => setEmail(texto)}
              value={email}
            />
          </FormControl>
          <FormControl w="90%" maxW="300px">
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              variant="rounded"
              placeholder="Senha"
              borderColor="coolGray.600"
              onChangeText={(texto) => setSenha(texto)}
              value={senha}
            />
          </FormControl>
          <Pressable
            onPress={logar}
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="darkBlue.300"
            maxW="96"
            shadow="3"
            bg="darkBlue.700"
            p="2"
            _hover={{ bg: "darkBlue.600" }}
          >
            <Text
              color="#FFF"
            >
              Cadastrar
            </Text>
          </Pressable>
          <Text>Usuário: {user?.email}</Text>

        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}


