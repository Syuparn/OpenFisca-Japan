import { useState } from "react";

import ScrollToTop from "../scrollToTop";
import configData from "../../config/app_config.json";
import { FormContent } from "./formContent";
import { HouseholdContext } from "../../contexts/HouseholdContext";
import { CurrentDateContext } from "../../contexts/CurrentDateContext";
import { APIServerURLContext } from "../../contexts/APIServerURLContext";

function CaluculationForm() {
  // 日付は「YYYY-MM-DD」の桁数フォーマットでないとOpenFisca APIが正常動作しない
  const currentDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;

  const apiURL =
    import.meta.env.MODE === "production"
      ? // configData.URL.OpenFisca_API.production // mainブランチマージ時にビルドされるバックエンドAPI。Cloud Run
        configData.URL.OpenFisca_API.dev // developブランチプッシュ時にビルドされるバックエンドAPI。Cloud Run
      : "http://localhost:50000";

  // NOTE: 計算したい制度については、予めここに設定する必要がある
  const [household, setHousehold] = useState({
    世帯員: {
      あなた: {},
    },
    世帯: {
      世帯1: {
        自分一覧: ["あなた"],
        児童手当: {
          [currentDate]: null,
        },
        児童扶養手当_最大: {
          [currentDate]: null,
        },
        児童扶養手当_最小: {
          [currentDate]: null,
        },
        /* 児童育成手当は東京都のみの制度のため除外
        児童育成手当: {
          [currentDate]: null,
        },
        */
        特別児童扶養手当_最小: {
          [currentDate]: null,
        },
        特別児童扶養手当_最大: {
          [currentDate]: null,
        },
        生活保護: {
          [currentDate]: null,
        },
        /* 障害児童育成手当は東京都のみの制度のため除外
        障害児童育成手当: {
          [currentDate]: null,
        },
        */
        障害児福祉手当: {
          [currentDate]: null,
        },
        生活支援費: {
          [currentDate]: null,
        },
        一時生活再建費: {
          [currentDate]: null,
        },
        福祉費: {
          [currentDate]: null,
        },
        緊急小口資金: {
          [currentDate]: null,
        },
        /* 住宅入居費はチェックボックスを有効化するまで除外
        住宅入居費: {
          [currentDate]: null,
        },
        */
        教育支援費: {
          [currentDate]: null,
        },
        就学支度費: {
          [currentDate]: null,
        },
        不動産担保型生活資金: {
          [currentDate]: null,
        },
      },
    },
  });
  const householdContextValue = {
    household,
    setHousehold,
  };

  return (
    <APIServerURLContext.Provider value={apiURL}>
      <CurrentDateContext.Provider value={currentDate}>
        <HouseholdContext.Provider value={householdContextValue}>
          <ScrollToTop />
          <FormContent />
        </HouseholdContext.Provider>
      </CurrentDateContext.Provider>
    </APIServerURLContext.Provider>
  );
}

export default CaluculationForm;
