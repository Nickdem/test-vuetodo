export const requestToTheLS = (type: string, key: string, value?: string) => {
  if (type === "get") {
    return localStorage.getItem(key) || [];
  } else if (type === "post") {
    return localStorage.setItem(key, JSON.stringify(value));
  } else {
    return localStorage.removeItem(key);
  }
};

const delayTime = 500;

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const delay = (fn: () => any): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fn()), getRandomInt(delayTime))
  );
};

export const dateNow = () => {
  return Date.now().toString();
};
