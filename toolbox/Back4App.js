import Logger from "./Logger";
import Config from "./Config";
import Errors from "./Errors";
import { ResponseSuccess, ResponseError } from "./Response";
import * as firebase from "firebase";
var RNFS = require("react-native-fs");
const filePath = RNFS.DocumentDirectoryPath + "/test.txt";

const { AsyncStorage } = require("react-native");
const Parse = require("parse/react-native");

const firebaseConfig = {
  apiKey: "AIzaSyDOYa-ksTmoD4ychJ8Ier9tZH2hYbB5UQw",
  authDomain: "hediyeci2018.firebaseapp.com",
  databaseURL: "https://hediyeci2018.firebaseio.com",
  projectId: "hediyeci2018",
  storageBucket: "hediyeci2018.appspot.com",
  messagingSenderId: "684174423079",
  appId: "1:684174423079:web:a6688d1b076d2295754a02",
  measurementId: "G-K0ZJPHW50S"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = Config.Back4App.url;
Parse.initialize(Config.Back4App.applicationId, Config.Back4App.javascriptKey, Config.Back4App.masterKey);
const ModelName = "Katalog";
const signUp = data => {
  AsyncStorage.clear();
  const user = new Parse.User();
  user.set("username", data.username);
  user.set("email", data.email);
  user.set("ad", data.ad);
  user.set("soyad", data.soyad);
  user.set("telefon", data.telefon);
  user.set("password", data.password);
  user.set("sorumluSandiklar", data.sorumluSandiklar);

  return user
    .signUp()
    .then(response => {
      Logger.log(response);
      return response;
    })
    .catch(error => {
      Logger.log(error);
      throw error;
    });
};

const logOut = () => {
  Parse.User.logOut();
};

const logIn = data => {
  return Parse.User.logIn(data.username, data.password)
    .then(response => {
      Logger.log(response);
      return response;
    })
    .catch(error => {
      Logger.log(error);
      throw error;
    });
};

const getRefUser = email => {
  const UserReferans = Parse.Object.extend("UserReferans");
  const query = new Parse.Query(UserReferans);
  query.equalTo("Email", email);
  return query.find().then(
    results => {
      Logger.log(results);
      return results;
    },
    error => {
      Logger.log(error);
      throw error;
    }
  );
};

const disableRefUser = id => {
  const UserReferans = Parse.Object.extend("UserReferans");
  const query = new Parse.Query(UserReferans);

  return query.get(id).then(object => {
    object.set("Kayit", true);
    object.save().then(
      response => {
        Logger.log("Kullanıcı ana tabloya kayıt edildi");
        return true;
      },
      error => {
        Logger.log(error);
        throw error;
      }
    );
  });
};

const passwordRecovery = email => {
  return Parse.User.requestPasswordReset(email)
    .then(() => {
      Logger.log("Kullanıcıya parola değiştirme maili gönderildi");
      return true;
    })
    .catch(error => {
      Logger.log(error);
      throw error;
    });
};

const addNewKatalog = async data => {
  /*const model = Parse.Object.extend(ModelName);
  const modelObject = new model();

  modelObject.set("adi", data.adi);
  modelObject.set("aktif", data.aktif);
  modelObject.set("tip", data.tip);

  return await modelObject.save().then(
    result => {
      return ResponseSuccess(result);
    },
    error => {
      return ResponseError(Errors.code, Errors.message);
    }
  );*/

  /*return await firebase
    .database()
    .ref(ModelName + "/")
    .push(data)
    .then(result => {
      return ResponseSuccess(result);
    })
    .catch(error => {
      return ResponseError(Errors.code, Errors.message);
    });*/

  // get a list of files and directories in the main bundle
  debugger;

  return await RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then(result => {
      console.log("GOT RESULT", result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], "utf8");
      }

      return "no file";
    })
    .then(contents => {
      // log the file contents
      console.log(contents);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
};

const getItemKatalog = async tip => {
  const model = Parse.Object.extend(ModelName);
  const query = new Parse.Query(model);
  query.equalTo("aktif", true);
  query.equalTo("tip", tip);
  return await query.find().then(
    results => {
      let list = [];
      for (let i = 0; i < results.length; i++) {
        let item = {
          objectId: results[i].id,
          adi: results[i].get("adi"),
          aktif: results[i].get("aktif"),
          tip: results[i].get("tip"),
          sira: results[i].get("sira"),
          createdAt: results[i].get("createdAt"),
          updatedAt: results[i].get("updatedAt")
        };

        list.push(item);
      }

      return ResponseSuccess(list);
    },
    error => {
      return ResponseError(Errors.code, Errors.message);
    }
  );
};

const getKatalog = async objectId => {
  const model = Parse.Object.extend(ModelName);
  const query = new Parse.Query(model);
  query.equalTo("objectId", objectId);

  return await query
    .first()
    .then(function(results) {
      if (results) {
        let item = {
          objectId: results.id,
          adi: results.get("adi"),
          aktif: results.get("aktif"),
          tip: results.get("tip"),
          sira: results.get("sira"),
          createdAt: results.get("createdAt"),
          updatedAt: results.get("updatedAt")
        };
        return ResponseSuccess(item);
      } else {
        return ResponseError(Errors.NotFound.Code, Errors.NotFound.Msg);
      }
    })
    .catch(function(error) {
      return ResponseError(Errors.code, Errors.message);
    });
};

const updateKatalog = async data => {
  const model = Parse.Object.extend(ModelName);
  const query = new Parse.Query(model);
  return await query.get(data.objectId).then(object => {
    object.set("adi", data.adi);
    object.set("aktif", data.aktif);
    object.set("tip", data.tip);
    return object.save().then(
      response => {
        return ResponseSuccess(response);
      },
      error => {
        return ResponseError(Errors.code, Errors.message);
      }
    );
  });
};

const deleteKatalog = async objectId => {
  const model = Parse.Object.extend(ModelName);
  const query = new Parse.Query(model);
  query.equalTo("objectId", objectId);

  return await query
    .first()
    .then(function(object) {
      if (object) {
        return object.destroy().then(
          response => {
            return ResponseSuccess(response);
          },
          error => {
            return ResponseError(Errors.code, Errors.message);
          }
        );
      } else {
        return ResponseError(Errors.NotFound.Code, Errors.NotFound.Msg);
      }
    })
    .catch(function(error) {
      return ResponseError(Errors.code, Errors.message);
    });
};

const createFile = async => {
  return RNFS.writeFile(filePath, "", "utf8")
    .then(success => {
      return true;
    })
    .catch(error => {
      throw error;
    });
};

const existFile = async path => {
  return RNFS.exists(path)
    .then(exist => {
      return exist;
    })
    .catch(error => {
      throw error;
    });
};

const appendFile = async content => {
  return RNFS.appendFile(filePath, content, "utf8")
    .then(success => {
      return true;
    })
    .catch(error => {
      throw error;
    });
};

const readFile = async => {
  return RNFS.readFile(filePath, "utf8")
    .then(content => {
      return content;
    })
    .catch(error => {
      throw error;
    });
};

export default {
  signUp,
  logIn,
  getRefUser,
  logOut,
  disableRefUser,
  passwordRecovery,
  deleteKatalog,
  updateKatalog,
  getKatalog,
  getItemKatalog,
  addNewKatalog,
  filePath,
  createFile,
  existFile,
  readFile,
  appendFile
};
