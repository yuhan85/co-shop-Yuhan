import express, { Response, Request } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import CognitoService from '../lib/cognito';
import DatabaseService from '../lib/database';
import User from '../models/User';

export const handlePreflight = async (req: Request, res: Response): Promise<void> => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 允许前端请求
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
    console.log('signUp body is valid');

    const { username, password, name, family_name } = req.body;
    const userAttr = [
      { Name: 'email', Value: username },
      { Name: 'name', Value: name },
      { Name: 'family_name', Value: family_name },
    ];

    const cognito = new CognitoService();
    // const database = new DatabaseService();

    try {
      const userSub = await cognito.signUpUser(username, password, userAttr);
      if (userSub) {
        const insertQuery = `INSERT INTO users_new (user_id, username, name, family_name)
          VALUES (?, ?, ?, ?)`;
        const values = [
          userSub, // Cognito User Sub 存入 user_id
          username, // 这里 username 就是 email
          name,
          family_name,
        ];

        await User.create({
          user_id: userSub,
          username,
          name,
          family_name,
        });
        res.status(200).json({ message: 'User registered successfully' });
      } else {
        res.status(500).json({ message: 'User registration failed' });
      }
    } catch (err) {
      console.error('Error in signUp:', err);
      res.status(500).json({
        message: 'Internal server error',
        error: (err as Error).message,
      });
    }
  };

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }

    const { username, password } = req.body;
    const cognito = new CognitoService();

    try {
      const success = await cognito.signInUser(username, password);
      if (success) {
        res.status(200).json({ message: 'Sign in successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error in signIn:', err);
      res.status(500).json({
        message: 'Internal server error',
        error: (err as Error).message,
      });
    }
  };

export const verify = async (req: Request, res: Response): Promise<void> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }

    const { username, code } = req.body;
    const cognito = new CognitoService();

    try {
      const success = await cognito.verifyAccount(username, code);
      if (success) {
        res.status(200).json({ message: 'Verification successful' });
      } else {
        res.status(400).json({ message: 'Verification failed' });
      }
    } catch (err) {
      console.error('Error in verify:', err);
      res.status(500).json({
        message: 'Internal server error',
        error: (err as Error).message,
      });
    }
  };