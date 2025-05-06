import * as bcrypt from 'bcryptjs';
export const hashPassword = async (password: string) => {
	const saltOrRounds = 10;
	return bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};
