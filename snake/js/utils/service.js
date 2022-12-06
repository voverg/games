export class Service {
  static get(name, defaultData = null) {
    let data = localStorage.getItem(name);
    data = data ? JSON.parse(data) : defaultData;

    return data;
  }

  static set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

}