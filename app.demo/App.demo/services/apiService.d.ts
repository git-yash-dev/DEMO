declare const ApiService: {
  login(email: string, password: string): Promise<any>;
  isAuthenticated(): Promise<boolean>;
  getCurrentUser(): Promise<any>;
  logout(): Promise<void>;
};

export default ApiService;