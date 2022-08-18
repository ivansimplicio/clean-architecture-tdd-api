import ormConfig from 'ormconfig';
import { DataSource, DataSourceOptions } from 'typeorm';

const source = new DataSource(ormConfig as DataSourceOptions);

export default source;
