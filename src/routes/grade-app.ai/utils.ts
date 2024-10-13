export function race<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve).catch(reject);
      });
    });
  }