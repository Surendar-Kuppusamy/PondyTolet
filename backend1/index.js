import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import winston from 'winston';
import mongoose from 'mongoose';
console.log('Test');