class Storage {
    constructor(){
        this._storage = {};
    }
    
    list() {
        return new Promise((resolve) => {
            resolve(Object.keys(this._storage));
        })
    }
    
    fetch(key) {
        return new Promise((resolve) => {
            resolve(this._storage[key]);
        })
    }

    store(key, data) {
        return new Promise((resolve) => {
            resolve(this._storage[key] = data);
        })
    }
    
    destroy(key) {
        return new Promise((resolve) => {
            resolve(delete this._storage[key]);
        })
    }
}

class MyStorage extends Storage {
    constructor(){
        super();
    }

    storeList(array) {
        return new Promise((resolve) => {
            const storePromises = array.map( (item) => this.store(item.key, item.data) );
            Promise.all(storePromises).then(resolve);
        });
    }

    async destroyStartedWith(beginningOfKey) {
        return new Promise((resolve) => {
            const keysList = await this.list();
            const deletePromises = keysList.filter(element => {
                const prefix = element.match(beginningOfKey);
                if (prefix && prefix.index === 0) {
                    return true
                }
            }).map(item => this.destroy(item));

            Promise.all(deletePromises).then(resolve)

        });
    }
}