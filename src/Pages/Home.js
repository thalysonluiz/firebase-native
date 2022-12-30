import { firebase } from "../firebase/connection";

import { child, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";


const database = getDatabase(firebase);

function listaUsers() {
  const usuariosRef = ref(database, 'usuarios/');
  onValue(usuariosRef, (snapshot) => {
    /* const data = snapshot.toJSON();
    console.log(data); */
    setUsuarios([])
    snapshot.forEach(item => {
      const data = {
        key: item.key,
        nome: item.val().nome,
        idade: item.val().idade
      }

      setUsuarios(oldArray => [
        ...oldArray,
        data
      ].reverse());
      //console.log(data);

    })
  });
  setLoading(false);
}

function listaUser(userId) {
  const usuariosRef = ref(database, 'usuarios/' + userId);
  onValue(usuariosRef, (snapshot) => {
    const data = snapshot.val();
    setNome(data.nome);
    setIdade(data.idade);
  });
}

async function atualizaDados(userId, nome, idade) {
  await update(ref(database, 'usuarios/' + userId), {
    nome: nome,
    idade: idade
  });
}

async function removeDados(userId) {
  await remove(ref(database, 'usuarios/' + userId));
}