const React = require("react-native");
const { Platform } = React;
import { Alert } from "react-native";
import Logger from "./Logger";
import Config from "./Config";
import Errors from "./Errors";
import { ResponseSuccess, ResponseError } from "./Response";
const RNFS = require("react-native-fs");
const ConfigIniParser = require("config-ini-parser").ConfigIniParser;
const delimiter = "\n";
const encoding = "utf8";
const PARSER = new ConfigIniParser(delimiter);

const ROOT_PATH = Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}/${Config.Settings.Klasor}` : `/sdcard/${Config.Settings.Klasor}`;
const INI_PATH = `${ROOT_PATH}/${Config.Settings.Dosya}`;
const INI_BACKUP_PATH = `${ROOT_PATH}/${Config.Settings.YedekKlasor}`;
const absolutePath = `/storage/emulated/0/MyApp/${Config.Settings.Klasor}`;

import defaultINI from "./data/defaultINI";

const existFile = async () => {
  return RNFS.exists(INI_PATH)
    .then(exist => {
      if (exist === true) return ResponseSuccess(true);
      else {
        return ResponseError(Errors.FileNotExist, null);
      }
    })
    .catch(error => {
      return ResponseError(Errors.FileNotExist, error);
    });
};

const createDirectory = async () => {
  try {
    await RNFS.mkdir(ROOT_PATH)
      .then(success => {
        RNFS.writeFile(INI_PATH, defaultINI.content, encoding);
        RNFS.mkdir(INI_BACKUP_PATH);
      })
      .catch(error => {
        alert(error);
      });
  } catch (error) {
    alert(error);
  }
};

const readDir = async path => {
  try {
    return await RNFS.readDir(path)
      .then(result => {
        return result;
      })
      .catch(error => {
        alert(error);
      });
  } catch (error) {
    alert(error);
  }
};

const deleteFile = async => {
  return RNFS.unlink(INI_PATH)
    .then(() => {
      return ResponseSuccess(true);
    })
    .catch(error => {
      return ResponseError(Errors.FileNotExist, error);
    });
};

const readIniFile = async () => {
  //alert(INI_PATH);
  let response = await existFile(INI_PATH);

  if (response.isSuccess === true) {
    return RNFS.readFile(INI_PATH, encoding)
      .then(content => {
        global.DATA = PARSER.parse(content);
        global.PARSE = PARSER;
        return ResponseSuccess(content);
      })
      .catch(error => {
        return ResponseError(Errors.NotRead, error);
      });
  } else {
    return ResponseError(Errors.FileNotExist, null);
  }
};

const writeIniFile = () => {
  let content = PARSER.stringify();
  return RNFS.writeFile(INI_PATH, content, encoding)
    .then(success => {
      PARSER.parse(content);
      return ResponseSuccess(success);
    })
    .catch(error => {
      return ResponseError(Errors.NotAppend, error);
    });
};

const getVisitWithGiftList = giftName => {
  let sectionList = [];
  let sections = PARSER.sections();
  for (let i = 3; i < sections.length; i++) {
    let isExist = PARSER.isHaveOption(sections[i], giftName);
    if (isExist) sectionList.push(sections[i]);
  }

  return sectionList;
};

const replaceOptionName = value => {
  return value
    .replace("Ğ", "g")
    .replace("Ü", "u")
    .replace("Ş", "s")
    .replace("I", "i")
    .replace("İ", "i")
    .replace("Ö", "o")
    .replace("Ç", "c")
    .replace("ğ", "g")
    .replace("ü", "u")
    .replace("ş", "s")
    .replace("ı", "i")
    .replace("ö", "o")
    .replace("ç", "c")
    .replace("-", "_")
    .replace(" ", "_")
    .replace("_", "_")
    .replace(".", "_")
    .replace("(", "")
    .replace(")", "")
    .toLowerCase();
};

const formatNumber = num => {
  if (num === null) return null;
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return num_parts.join(".");
};

export default {
  PARSER,
  ROOT_PATH,
  INI_PATH,
  INI_BACKUP_PATH,
  existFile,
  readIniFile,
  writeIniFile,
  getVisitWithGiftList,
  replaceOptionName,
  deleteFile,
  createDirectory,
  formatNumber,
  readDir
};
