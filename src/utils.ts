export const extractParam = (url: string, paramKey: string) => {
  const paramsString = url.split("?");

  for (let i = 0; i < paramsString.length; i++) {
    const paramParts = paramsString[i].split("=");
    if (paramParts[0] === paramKey) {
      return paramParts[1];
    }
  }
};
