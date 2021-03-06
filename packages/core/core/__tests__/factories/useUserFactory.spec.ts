import { useUserFactory } from '../../src/factories';
import { sharedRef } from './../../src/utils';

const factoryParams = {
  load: jest.fn(() => null),
  logOut: jest.fn(),
  updateUser: jest.fn(),
  register: jest.fn(),
  logIn: jest.fn(),
  changePassword: jest.fn(),
  refreshUser: jest.fn()
};

const useUser = useUserFactory(factoryParams);
const useUserMethods = useUser();

describe('[CORE - factories] useUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const useUser = useUserFactory(factoryParams);
      const { user, isAuthenticated } = useUser();

      expect(user.value).toEqual(null);
      expect(isAuthenticated.value).toEqual(false);
    });

    it('isAuthenticated returns true for logged in user', async () => {
      const { isAuthenticated } = useUserMethods;
      const userToLogin = { username: 'John', password: '123456'};
      factoryParams.logIn.mockReturnValueOnce(
        userToLogin
      );
      await useUserMethods.login({ user: userToLogin });
      expect(isAuthenticated.value).toBe(true);
    });

    it('set given user property', () => {
      const { setUser } = useUser();
      setUser({ username: 'test' });
      expect(sharedRef).toHaveBeenCalled();
    });
  });
  describe('methods', () => {
    describe('updateUser', () => {
      it('return updated user data', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateUser.mockReturnValueOnce(paramsToUpdate);
        await useUserMethods.updateUser({ user: paramsToUpdate });
        expect(useUserMethods.user.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('test-568-08989');
        factoryParams.updateUser.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.updateUser('' as any);
        await expect(useUserMethods.error.value.updateUser).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('register', () => {
      it('return registered user', async () => {
        const userToRegister = { email: 'John', password: '123456', firstName: 'Diego', lastName: 'Ramirez'};
        factoryParams.register.mockReturnValueOnce(userToRegister);
        await useUserMethods.register({ user: userToRegister });
        expect(useUserMethods.user.value).toEqual(userToRegister);
      });
      it('throws error', async () => {
        const err = new Error('test-568-5687565');
        factoryParams.register.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.register('' as any);
        expect(useUserMethods.error.value.register).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('login', () => {
      it('return logged user', async () => {
        const userToLogin = { username: 'John', password: '123456'};
        factoryParams.logIn.mockReturnValueOnce(
          userToLogin
        );
        await useUserMethods.login({ user: userToLogin });
        expect(useUserMethods.user.value).toEqual(userToLogin);
      });
      it('throws error', async () => {
        const err = new Error('test-568-232332');
        factoryParams.logIn.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.login('' as any);
        expect(useUserMethods.error.value.login).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('logout', () => {
      it('return logout user', async () => {
        factoryParams.logOut.mockReturnValueOnce(null);
        await useUserMethods.logout();
        expect(factoryParams.logOut).toHaveBeenCalled();
      });
      it('throws error', async () => {
        const err = new Error('test-value-568-232332');
        factoryParams.logOut.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.logout();
        expect(useUserMethods.error.value.logout).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('load', () => {
      it('return loadedUser user', async () => {
        const user = {firstName: 'John', lastName: 'Galt'};
        factoryParams.load.mockReturnValueOnce(user);
        await useUserMethods.load();
        expect(factoryParams.load).toHaveBeenCalled();
        expect(useUserMethods.user.value).toEqual(user);
      });
      it('throws error', async () => {
        const err = new Error('test-value-568');
        factoryParams.load.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.load();
        expect(useUserMethods.error.value.load).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('changePassword', () => {
      it('return logout user', async () => {
        const changePasswordData = {currentUser: {email: 'tonny@dot.com', password: '123456'}, currentPassword: '123456', newPassword: '654321'};
        factoryParams.changePassword.mockReturnValueOnce(changePasswordData);
        await useUserMethods.changePassword({ current: changePasswordData.currentPassword, new: changePasswordData.newPassword });
        expect(useUserMethods.user.value).toEqual(changePasswordData);
      });
      it('throws error', async () => {
        const err = new Error('test-value');
        factoryParams.changePassword.mockImplementationOnce(() => {
          throw err;
        });
        await useUserMethods.changePassword({ current: null as any, new: null as any });
        expect(useUserMethods.error.value.changePassword).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
  });
});
