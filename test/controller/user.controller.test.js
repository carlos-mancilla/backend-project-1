const fs = require('fs/promises');
const {
    getUsers,
    createUser
} = require('../../controller');

jest.mock('fs', () => {
    return {
        readFile: jest.fn(),
        writeFile: jest.fn(),
        existsSync: jest.fn(),
        mkdirSync: jest.fn(),
        stat: jest.fn()
    };
});

const mockGetAllUsers = {
    "users": [
        {
            "id": 0,
            "name": "Carlos Mancilla",
            "email": "carlos@mail.com",
            "phone": "+56998018104"
        }
    ]
};

const mockCreateUser = {
    user: {
        name: 'Cristóbal Mancilla',
        email: 'cris@mail.com',
        phone: '+56998018104'
    }
};

const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnValue({ json: jest.fn() })
}

describe('user tests', () => {
    describe('obtiene todos los usuarios', () => {
        it('caso exitoso', async () => {
            fs.readFile = jest.fn().mockImplementation(async () =>
                Promise.resolve(JSON.stringify(mockGetAllUsers))
            );
            await getUsers({}, mockResponse);
            expect(fs.readFile).toHaveBeenCalled();
        });
    });

    describe('crea usuario', () => {
        it('caso exitoso', async () => {
            fs.readFile = jest.fn().mockImplementation(async () =>
                Promise.resolve(JSON.stringify(mockGetAllUsers))
            );
            fs.writeFile = jest.fn().mockImplementation(async () =>
                Promise.resolve(JSON.stringify('some-value'))
            );
            await createUser({ body: mockCreateUser }, mockResponse);
            expect(fs.readFile).toHaveBeenCalled();
            expect(fs.writeFile).toHaveBeenCalled();
        });
    });
});