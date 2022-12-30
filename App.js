import React, { useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  FormControl,
  WarningOutlineIcon,
  Input,
  Pressable,
  FlatList,
} from "native-base";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { firebase } from "./src/firebase/connection";

import { UsuarioItem } from "./src/components/UsuarioItem";
import { Loading } from "./src/components/Loading";

const auth = getAuth(firebase);

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "Aafreen Khan",
  timeStamp: "12:47 PM",
  recentText: "Good Day!",
  avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
  id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  fullName: "Sujitha Mathur",
  timeStamp: "11:11 PM",
  recentText: "Cheer up, there!",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
  id: "58694a0f-3da1-471f-bd96-145571e29d72",
  fullName: "Anci Barroco",
  timeStamp: "6:22 PM",
  recentText: "Good Day!",
  avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  id: "68694a0f-3da1-431f-bd56-142371e29d72",
  fullName: "Aniket Kumar",
  timeStamp: "8:56 PM",
  recentText: "All the best",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
}, {
  id: "28694a0f-3da1-471f-bd96-142456e29d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}];

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
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
            <FormControl.Label>Email</FormControl.Label>
            <Input
              variant="rounded"
              placeholder="Email"
              borderColor="coolGray.600"
              onChangeText={(texto) => setEmail(texto)}
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
            />
          </FormControl>
          <Pressable
            onPress={cadastrar}
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
          <Loading />
          <FlatList data={data} renderItem={({
            item
          }) => <UsuarioItem item={item} />} keyExtractor={item => item.id} />
          {/* <HStack space={2} alignItems="center">
            <Text>Edit</Text>
            <Box
              _web={{
                _text: {
                  fontFamily: "monospace",
                  fontSize: "sm",
                },
              }}
              px={2}
              py={1}
              _dark={{ bg: "blueGray.800" }}
              _light={{ bg: "blueGray.200" }}
            >
              App.js
            </Box>
            <Text>and save to reload.</Text>
          </HStack>
          <Link href="https://docs.nativebase.io" isExternal>
            <Text color="primary.500" underline fontSize={"xl"}>
              Learn NativeBase
            </Text>
          </Link>
          <ToggleDarkMode /> */}
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
