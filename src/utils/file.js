import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { format } from "date-fns";

import T from "T";

export const downloadFile = (response, type) => {
  const date = format(new Date(), BACKEND_DATE_FORMAT);
  var url = window.URL.createObjectURL(response);
  var a = document.createElement("a");
  a.href = url;
  a.download = type === T.XL ? `MIS-${date}.xlsx` :type === T.CSV ? `MIS-${date}.csv` : `MIS-${date}.pdf`;
  document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click();
  a.remove(); //afterwards we remove the element again
};
