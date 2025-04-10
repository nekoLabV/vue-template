type JSONArray = Array<Exclude<JSONValue, undefined>>;

type JSONObject = {
  [key: string]: JSONValue;
};

type JSONValue = string | number | boolean | null | JSONObject | JSONArray | undefined;

interface Config {
  el: string;
}