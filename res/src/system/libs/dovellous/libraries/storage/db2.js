const DB_UPDATE = true;
const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';
let   DB_NAME_STR = 'db_name';


const dbinit = async () => {

    const info = await Device.getInfo();

    if (info.platform === 'android') {

        try {
            await CapacitorSQLite.requestPermissions();
            setupDatabase();
        } catch (e) {
            console.table([{
                header: 'No DB access',
                message: 'This app can\'t work without Database access.',
                buttons: ['OK']
            }]);

        }

    } else {

        setupDatabase();

    }
};

const setupDatabase = async () => {
    const dbSetupDone = await Storage.get({key: DB_SETUP_KEY});

    if (!dbSetupDone.value) {
        downloadDatabase();
    } else {
        DB_NAME_STR = (await Storage.get({key: DB_NAME_KEY})).value;
        await CapacitorSQLite.open({database: DB_NAME_STR});
    }
};

// Potentially build this out to an update logic:
// Sync your data on every app start and update the device DB
const downloadDatabase = async () => {


    $f7.request.get('https://devdactic.fra1.digitaloceanspaces.com/tutorial/db.json')
        .then(function (res) {

            if(res.status === 200) {

                let jsonExport = res.data;

                const jsonstring = JSON.stringify(jsonExport);

                CapacitorSQLite.isJsonValid({jsonstring}).then(function (isValid){

                    if (isValid.result) {
                        DB_NAME_STR = jsonExport.database;

                        Storage.set({key: DB_NAME_KEY, value: DB_NAME_STR});

                        Storage.set({key: DB_SETUP_KEY, value: '1'});

                        CapacitorSQLite.importFromJson({jsonstring});

                        // Your potential logic to detect offline changes later
                        if (!DB_UPDATE) {
                            CapacitorSQLite.createSyncTable();
                        } else {
                            CapacitorSQLite.setSyncDate({syncdate: '' + new Date().getTime()})
                        }
                    }

                });

                $f7.preloader.hide();

            }else{

                $f7.preloader.hide();

                $f7.dialog.alert("Failed to load database file. Please check your internet settings.");

            }

        })
        .catch(function (err) {

            $f7.preloader.hide();

            $f7.dialog.alert("Failed to download PDF file. Please check your internet settings.");

            console.log(err.xhr)
            console.log(err.status)
            console.log(err.message)
        });

};


dbinit().then(function (){

    console.log(":: INIT DB");

    CapacitorSQLite.createConnection({ database: DB_NAME_STR }).then(function (){

        console.log(":: CXN CREATED SUCCESSFULLY!");

    });

});


getProductList() {
    return this.dbReady.pipe(
        switchMap(isReady => {
            if (!isReady) {
                return of({ values: [] });
            } else {
                const statement = 'SELECT * FROM products;';
                return from(CapacitorSQLite.query({ statement, values: [] }));
            }
        })
    )
}

async getProductById(id) {
    const statement = `SELECT * FROM products LEFT JOIN vendors ON vendors.id=products.vendorid WHERE products.id=${id} ;`;
    return (await CapacitorSQLite.query({ statement, values: [] })).values[0];
}

getDatabaseExport(mode) {
    return CapacitorSQLite.exportToJson({ jsonexportmode: mode });
}

addDummyProduct(name) {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const randomVendor = Math.floor(Math.random() * 3) + 1
    const statement = `INSERT INTO products (name, currency, value, vendorid) VALUES ('${name}','EUR', ${randomValue}, ${randomVendor});`;
    return CapacitorSQLite.execute({ statements: statement });
}

deleteProduct(productId) {
    const statement = `DELETE FROM products WHERE id = ${productId};`;
    return CapacitorSQLite.execute({ statements: statement });
}

// For testing only..
async deleteDatabase() {
    const dbName = await Storage.get({ key: DB_NAME_KEY });
    await Storage.set({ key: DB_SETUP_KEY, value: null });
    return CapacitorSQLite.deleteDatabase({ database: dbName.value });
}
