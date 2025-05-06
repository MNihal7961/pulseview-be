import { Injectable, Logger } from '@nestjs/common';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { ObjectId } from 'mongodb';
import { SignInUserDTO } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async findOneByEmail(email: string) {
		return await this.usersRepository.findOne({ where: { email } });
	}

	async findOneById(id: string) {
		const objectId = new ObjectId(id);
		if (!objectId) {
			return {
				success: false,
				message: 'Invalid user id',
				data: null,
			};
		}
		const user = await this.usersRepository.findOne({
			where: { _id: objectId },
		});

		return {
			success: true,
			message: 'User found',
			data: user,
		};
	}

	async genarateJwtToken(user: User) {
		const secret = this.configService.get<string>('AUTH_SECRET');
		if (!secret) {
			this.logger.error('JWT secret is not defined!');
			throw new Error('JWT secret is not defined!');
		}
		const accessToken = this.jwtService.sign(
			{
				_id: user._id,
				email: user.email,
			},
			{ secret, expiresIn: '1d' },
		);

		return accessToken;
	}

	async createNewUser(payload: SignUpUserDTO) {
		try {
			const existingUser = await this.findOneByEmail(payload.email);
			if (existingUser) {
				return {
					success: false,
					message: `User with email ${payload.email} already exists`,
					data: null,
				};
			}

			const user = new User();
			user.firstName = payload.firstName;
			user.lastName = payload.lastName;
			user.email = payload.email;

			const hashedPassword = await hashPassword(payload.password);
			user.password = hashedPassword;

			const newUser = await this.usersRepository.save(user);

			return {
				success: true,
				message: 'User created successfully',
				data: newUser,
			};
		} catch (error: any) {
			this.logger.error('Error in creating new user', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}

	async signin(payload: SignInUserDTO) {
		try {
			const user = await this.findOneByEmail(payload.email);
			if (!user) {
				return {
					success: false,
					message: `User with email ${payload.email} not found`,
					data: null,
				};
			}

			const isPasswordValid = await comparePassword(
				payload.password,
				user.password,
			);
			if (!isPasswordValid) {
				return {
					success: false,
					message: 'Wrong password',
					data: null,
				};
			}

			const token = await this.genarateJwtToken(user);

			if (!token) {
				return {
					success: false,
					message: 'Error in generating token',
					data: null,
				};
			}

			return {
				status: true,
				message: 'Signin successful',
				accessToken: token,
				data: user,
			};
		} catch (error: any) {
			this.logger.error('Error in signin', error);
			return {
				success: false,
				message: error.message,
				data: null,
			};
		}
	}
}
