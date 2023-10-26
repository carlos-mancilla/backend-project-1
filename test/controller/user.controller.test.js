const fs = require('fs/promises');
const {
    getUsers
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
            "password": "123456789",
            "phone": "+56998018104"
        }
    ]
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
});