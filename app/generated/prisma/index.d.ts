
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Rol
 * 
 */
export type Rol = $Result.DefaultSelection<Prisma.$RolPayload>
/**
 * Model Inquilino
 * 
 */
export type Inquilino = $Result.DefaultSelection<Prisma.$InquilinoPayload>
/**
 * Model Acompañante
 * 
 */
export type Acompañante = $Result.DefaultSelection<Prisma.$AcompañantePayload>
/**
 * Model Apartamento
 * 
 */
export type Apartamento = $Result.DefaultSelection<Prisma.$ApartamentoPayload>
/**
 * Model TiposHabitacion
 * 
 */
export type TiposHabitacion = $Result.DefaultSelection<Prisma.$TiposHabitacionPayload>
/**
 * Model Habitaciones
 * 
 */
export type Habitaciones = $Result.DefaultSelection<Prisma.$HabitacionesPayload>
/**
 * Model Servicios
 * 
 */
export type Servicios = $Result.DefaultSelection<Prisma.$ServiciosPayload>
/**
 * Model ApartamentoServicios
 * 
 */
export type ApartamentoServicios = $Result.DefaultSelection<Prisma.$ApartamentoServiciosPayload>
/**
 * Model Contratos
 * 
 */
export type Contratos = $Result.DefaultSelection<Prisma.$ContratosPayload>
/**
 * Model Recibos
 * 
 */
export type Recibos = $Result.DefaultSelection<Prisma.$RecibosPayload>
/**
 * Model ReciboDetalles
 * 
 */
export type ReciboDetalles = $Result.DefaultSelection<Prisma.$ReciboDetallesPayload>
/**
 * Model Permiso
 * 
 */
export type Permiso = $Result.DefaultSelection<Prisma.$PermisoPayload>
/**
 * Model RolPermiso
 * 
 */
export type RolPermiso = $Result.DefaultSelection<Prisma.$RolPermisoPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Rols
 * const rols = await prisma.rol.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Rols
   * const rols = await prisma.rol.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.rol`: Exposes CRUD operations for the **Rol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rols
    * const rols = await prisma.rol.findMany()
    * ```
    */
  get rol(): Prisma.RolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquilino`: Exposes CRUD operations for the **Inquilino** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inquilinos
    * const inquilinos = await prisma.inquilino.findMany()
    * ```
    */
  get inquilino(): Prisma.InquilinoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acompañante`: Exposes CRUD operations for the **Acompañante** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Acompañantes
    * const acompañantes = await prisma.acompañante.findMany()
    * ```
    */
  get acompañante(): Prisma.AcompañanteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apartamento`: Exposes CRUD operations for the **Apartamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Apartamentos
    * const apartamentos = await prisma.apartamento.findMany()
    * ```
    */
  get apartamento(): Prisma.ApartamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tiposHabitacion`: Exposes CRUD operations for the **TiposHabitacion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TiposHabitacions
    * const tiposHabitacions = await prisma.tiposHabitacion.findMany()
    * ```
    */
  get tiposHabitacion(): Prisma.TiposHabitacionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.habitaciones`: Exposes CRUD operations for the **Habitaciones** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Habitaciones
    * const habitaciones = await prisma.habitaciones.findMany()
    * ```
    */
  get habitaciones(): Prisma.HabitacionesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.servicios`: Exposes CRUD operations for the **Servicios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servicios
    * const servicios = await prisma.servicios.findMany()
    * ```
    */
  get servicios(): Prisma.ServiciosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apartamentoServicios`: Exposes CRUD operations for the **ApartamentoServicios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApartamentoServicios
    * const apartamentoServicios = await prisma.apartamentoServicios.findMany()
    * ```
    */
  get apartamentoServicios(): Prisma.ApartamentoServiciosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contratos`: Exposes CRUD operations for the **Contratos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contratos
    * const contratos = await prisma.contratos.findMany()
    * ```
    */
  get contratos(): Prisma.ContratosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recibos`: Exposes CRUD operations for the **Recibos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recibos
    * const recibos = await prisma.recibos.findMany()
    * ```
    */
  get recibos(): Prisma.RecibosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reciboDetalles`: Exposes CRUD operations for the **ReciboDetalles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReciboDetalles
    * const reciboDetalles = await prisma.reciboDetalles.findMany()
    * ```
    */
  get reciboDetalles(): Prisma.ReciboDetallesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permiso`: Exposes CRUD operations for the **Permiso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permisos
    * const permisos = await prisma.permiso.findMany()
    * ```
    */
  get permiso(): Prisma.PermisoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolPermiso`: Exposes CRUD operations for the **RolPermiso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolPermisos
    * const rolPermisos = await prisma.rolPermiso.findMany()
    * ```
    */
  get rolPermiso(): Prisma.RolPermisoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Rol: 'Rol',
    Inquilino: 'Inquilino',
    Acompañante: 'Acompañante',
    Apartamento: 'Apartamento',
    TiposHabitacion: 'TiposHabitacion',
    Habitaciones: 'Habitaciones',
    Servicios: 'Servicios',
    ApartamentoServicios: 'ApartamentoServicios',
    Contratos: 'Contratos',
    Recibos: 'Recibos',
    ReciboDetalles: 'ReciboDetalles',
    Permiso: 'Permiso',
    RolPermiso: 'RolPermiso',
    Usuario: 'Usuario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "rol" | "inquilino" | "acompañante" | "apartamento" | "tiposHabitacion" | "habitaciones" | "servicios" | "apartamentoServicios" | "contratos" | "recibos" | "reciboDetalles" | "permiso" | "rolPermiso" | "usuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Rol: {
        payload: Prisma.$RolPayload<ExtArgs>
        fields: Prisma.RolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          findFirst: {
            args: Prisma.RolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          findMany: {
            args: Prisma.RolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>[]
          }
          create: {
            args: Prisma.RolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          createMany: {
            args: Prisma.RolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          update: {
            args: Prisma.RolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          deleteMany: {
            args: Prisma.RolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          aggregate: {
            args: Prisma.RolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRol>
          }
          groupBy: {
            args: Prisma.RolGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolCountArgs<ExtArgs>
            result: $Utils.Optional<RolCountAggregateOutputType> | number
          }
        }
      }
      Inquilino: {
        payload: Prisma.$InquilinoPayload<ExtArgs>
        fields: Prisma.InquilinoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquilinoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquilinoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          findFirst: {
            args: Prisma.InquilinoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquilinoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          findMany: {
            args: Prisma.InquilinoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>[]
          }
          create: {
            args: Prisma.InquilinoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          createMany: {
            args: Prisma.InquilinoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InquilinoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          update: {
            args: Prisma.InquilinoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          deleteMany: {
            args: Prisma.InquilinoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquilinoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InquilinoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquilinoPayload>
          }
          aggregate: {
            args: Prisma.InquilinoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquilino>
          }
          groupBy: {
            args: Prisma.InquilinoGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquilinoGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquilinoCountArgs<ExtArgs>
            result: $Utils.Optional<InquilinoCountAggregateOutputType> | number
          }
        }
      }
      Acompañante: {
        payload: Prisma.$AcompañantePayload<ExtArgs>
        fields: Prisma.AcompañanteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcompañanteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcompañanteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          findFirst: {
            args: Prisma.AcompañanteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcompañanteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          findMany: {
            args: Prisma.AcompañanteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>[]
          }
          create: {
            args: Prisma.AcompañanteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          createMany: {
            args: Prisma.AcompañanteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcompañanteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          update: {
            args: Prisma.AcompañanteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          deleteMany: {
            args: Prisma.AcompañanteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcompañanteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcompañanteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcompañantePayload>
          }
          aggregate: {
            args: Prisma.AcompañanteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcompañante>
          }
          groupBy: {
            args: Prisma.AcompañanteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcompañanteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcompañanteCountArgs<ExtArgs>
            result: $Utils.Optional<AcompañanteCountAggregateOutputType> | number
          }
        }
      }
      Apartamento: {
        payload: Prisma.$ApartamentoPayload<ExtArgs>
        fields: Prisma.ApartamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApartamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApartamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          findFirst: {
            args: Prisma.ApartamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApartamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          findMany: {
            args: Prisma.ApartamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>[]
          }
          create: {
            args: Prisma.ApartamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          createMany: {
            args: Prisma.ApartamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApartamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          update: {
            args: Prisma.ApartamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          deleteMany: {
            args: Prisma.ApartamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApartamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApartamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoPayload>
          }
          aggregate: {
            args: Prisma.ApartamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApartamento>
          }
          groupBy: {
            args: Prisma.ApartamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApartamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApartamentoCountArgs<ExtArgs>
            result: $Utils.Optional<ApartamentoCountAggregateOutputType> | number
          }
        }
      }
      TiposHabitacion: {
        payload: Prisma.$TiposHabitacionPayload<ExtArgs>
        fields: Prisma.TiposHabitacionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TiposHabitacionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TiposHabitacionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          findFirst: {
            args: Prisma.TiposHabitacionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TiposHabitacionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          findMany: {
            args: Prisma.TiposHabitacionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>[]
          }
          create: {
            args: Prisma.TiposHabitacionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          createMany: {
            args: Prisma.TiposHabitacionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TiposHabitacionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          update: {
            args: Prisma.TiposHabitacionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          deleteMany: {
            args: Prisma.TiposHabitacionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TiposHabitacionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TiposHabitacionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposHabitacionPayload>
          }
          aggregate: {
            args: Prisma.TiposHabitacionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTiposHabitacion>
          }
          groupBy: {
            args: Prisma.TiposHabitacionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TiposHabitacionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TiposHabitacionCountArgs<ExtArgs>
            result: $Utils.Optional<TiposHabitacionCountAggregateOutputType> | number
          }
        }
      }
      Habitaciones: {
        payload: Prisma.$HabitacionesPayload<ExtArgs>
        fields: Prisma.HabitacionesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HabitacionesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HabitacionesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          findFirst: {
            args: Prisma.HabitacionesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HabitacionesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          findMany: {
            args: Prisma.HabitacionesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>[]
          }
          create: {
            args: Prisma.HabitacionesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          createMany: {
            args: Prisma.HabitacionesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HabitacionesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          update: {
            args: Prisma.HabitacionesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          deleteMany: {
            args: Prisma.HabitacionesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HabitacionesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HabitacionesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HabitacionesPayload>
          }
          aggregate: {
            args: Prisma.HabitacionesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHabitaciones>
          }
          groupBy: {
            args: Prisma.HabitacionesGroupByArgs<ExtArgs>
            result: $Utils.Optional<HabitacionesGroupByOutputType>[]
          }
          count: {
            args: Prisma.HabitacionesCountArgs<ExtArgs>
            result: $Utils.Optional<HabitacionesCountAggregateOutputType> | number
          }
        }
      }
      Servicios: {
        payload: Prisma.$ServiciosPayload<ExtArgs>
        fields: Prisma.ServiciosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiciosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiciosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          findFirst: {
            args: Prisma.ServiciosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiciosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          findMany: {
            args: Prisma.ServiciosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>[]
          }
          create: {
            args: Prisma.ServiciosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          createMany: {
            args: Prisma.ServiciosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ServiciosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          update: {
            args: Prisma.ServiciosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          deleteMany: {
            args: Prisma.ServiciosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiciosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiciosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiciosPayload>
          }
          aggregate: {
            args: Prisma.ServiciosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServicios>
          }
          groupBy: {
            args: Prisma.ServiciosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiciosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiciosCountArgs<ExtArgs>
            result: $Utils.Optional<ServiciosCountAggregateOutputType> | number
          }
        }
      }
      ApartamentoServicios: {
        payload: Prisma.$ApartamentoServiciosPayload<ExtArgs>
        fields: Prisma.ApartamentoServiciosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApartamentoServiciosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApartamentoServiciosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          findFirst: {
            args: Prisma.ApartamentoServiciosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApartamentoServiciosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          findMany: {
            args: Prisma.ApartamentoServiciosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>[]
          }
          create: {
            args: Prisma.ApartamentoServiciosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          createMany: {
            args: Prisma.ApartamentoServiciosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApartamentoServiciosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          update: {
            args: Prisma.ApartamentoServiciosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          deleteMany: {
            args: Prisma.ApartamentoServiciosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApartamentoServiciosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApartamentoServiciosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApartamentoServiciosPayload>
          }
          aggregate: {
            args: Prisma.ApartamentoServiciosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApartamentoServicios>
          }
          groupBy: {
            args: Prisma.ApartamentoServiciosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApartamentoServiciosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApartamentoServiciosCountArgs<ExtArgs>
            result: $Utils.Optional<ApartamentoServiciosCountAggregateOutputType> | number
          }
        }
      }
      Contratos: {
        payload: Prisma.$ContratosPayload<ExtArgs>
        fields: Prisma.ContratosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContratosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContratosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          findFirst: {
            args: Prisma.ContratosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContratosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          findMany: {
            args: Prisma.ContratosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>[]
          }
          create: {
            args: Prisma.ContratosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          createMany: {
            args: Prisma.ContratosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContratosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          update: {
            args: Prisma.ContratosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          deleteMany: {
            args: Prisma.ContratosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContratosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContratosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContratosPayload>
          }
          aggregate: {
            args: Prisma.ContratosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContratos>
          }
          groupBy: {
            args: Prisma.ContratosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContratosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContratosCountArgs<ExtArgs>
            result: $Utils.Optional<ContratosCountAggregateOutputType> | number
          }
        }
      }
      Recibos: {
        payload: Prisma.$RecibosPayload<ExtArgs>
        fields: Prisma.RecibosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecibosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecibosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          findFirst: {
            args: Prisma.RecibosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecibosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          findMany: {
            args: Prisma.RecibosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>[]
          }
          create: {
            args: Prisma.RecibosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          createMany: {
            args: Prisma.RecibosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecibosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          update: {
            args: Prisma.RecibosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          deleteMany: {
            args: Prisma.RecibosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecibosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecibosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecibosPayload>
          }
          aggregate: {
            args: Prisma.RecibosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecibos>
          }
          groupBy: {
            args: Prisma.RecibosGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecibosGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecibosCountArgs<ExtArgs>
            result: $Utils.Optional<RecibosCountAggregateOutputType> | number
          }
        }
      }
      ReciboDetalles: {
        payload: Prisma.$ReciboDetallesPayload<ExtArgs>
        fields: Prisma.ReciboDetallesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReciboDetallesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReciboDetallesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          findFirst: {
            args: Prisma.ReciboDetallesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReciboDetallesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          findMany: {
            args: Prisma.ReciboDetallesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>[]
          }
          create: {
            args: Prisma.ReciboDetallesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          createMany: {
            args: Prisma.ReciboDetallesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReciboDetallesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          update: {
            args: Prisma.ReciboDetallesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          deleteMany: {
            args: Prisma.ReciboDetallesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReciboDetallesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReciboDetallesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReciboDetallesPayload>
          }
          aggregate: {
            args: Prisma.ReciboDetallesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReciboDetalles>
          }
          groupBy: {
            args: Prisma.ReciboDetallesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReciboDetallesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReciboDetallesCountArgs<ExtArgs>
            result: $Utils.Optional<ReciboDetallesCountAggregateOutputType> | number
          }
        }
      }
      Permiso: {
        payload: Prisma.$PermisoPayload<ExtArgs>
        fields: Prisma.PermisoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermisoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermisoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          findFirst: {
            args: Prisma.PermisoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermisoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          findMany: {
            args: Prisma.PermisoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>[]
          }
          create: {
            args: Prisma.PermisoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          createMany: {
            args: Prisma.PermisoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PermisoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          update: {
            args: Prisma.PermisoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          deleteMany: {
            args: Prisma.PermisoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermisoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PermisoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermisoPayload>
          }
          aggregate: {
            args: Prisma.PermisoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermiso>
          }
          groupBy: {
            args: Prisma.PermisoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermisoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermisoCountArgs<ExtArgs>
            result: $Utils.Optional<PermisoCountAggregateOutputType> | number
          }
        }
      }
      RolPermiso: {
        payload: Prisma.$RolPermisoPayload<ExtArgs>
        fields: Prisma.RolPermisoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolPermisoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolPermisoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          findFirst: {
            args: Prisma.RolPermisoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolPermisoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          findMany: {
            args: Prisma.RolPermisoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>[]
          }
          create: {
            args: Prisma.RolPermisoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          createMany: {
            args: Prisma.RolPermisoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RolPermisoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          update: {
            args: Prisma.RolPermisoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          deleteMany: {
            args: Prisma.RolPermisoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolPermisoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolPermisoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPermisoPayload>
          }
          aggregate: {
            args: Prisma.RolPermisoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolPermiso>
          }
          groupBy: {
            args: Prisma.RolPermisoGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolPermisoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolPermisoCountArgs<ExtArgs>
            result: $Utils.Optional<RolPermisoCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    rol?: RolOmit
    inquilino?: InquilinoOmit
    acompañante?: AcompañanteOmit
    apartamento?: ApartamentoOmit
    tiposHabitacion?: TiposHabitacionOmit
    habitaciones?: HabitacionesOmit
    servicios?: ServiciosOmit
    apartamentoServicios?: ApartamentoServiciosOmit
    contratos?: ContratosOmit
    recibos?: RecibosOmit
    reciboDetalles?: ReciboDetallesOmit
    permiso?: PermisoOmit
    rolPermiso?: RolPermisoOmit
    usuario?: UsuarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RolCountOutputType
   */

  export type RolCountOutputType = {
    permisos: number
    Usuario: number
  }

  export type RolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permisos?: boolean | RolCountOutputTypeCountPermisosArgs
    Usuario?: boolean | RolCountOutputTypeCountUsuarioArgs
  }

  // Custom InputTypes
  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolCountOutputType
     */
    select?: RolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeCountPermisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
  }

  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeCountUsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * Count Type InquilinoCountOutputType
   */

  export type InquilinoCountOutputType = {
    Acompañante: number
    Contratos: number
  }

  export type InquilinoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Acompañante?: boolean | InquilinoCountOutputTypeCountAcompañanteArgs
    Contratos?: boolean | InquilinoCountOutputTypeCountContratosArgs
  }

  // Custom InputTypes
  /**
   * InquilinoCountOutputType without action
   */
  export type InquilinoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquilinoCountOutputType
     */
    select?: InquilinoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InquilinoCountOutputType without action
   */
  export type InquilinoCountOutputTypeCountAcompañanteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcompañanteWhereInput
  }

  /**
   * InquilinoCountOutputType without action
   */
  export type InquilinoCountOutputTypeCountContratosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContratosWhereInput
  }


  /**
   * Count Type ApartamentoCountOutputType
   */

  export type ApartamentoCountOutputType = {
    apartamento: number
    ApartamentoServicios: number
    Contratos: number
  }

  export type ApartamentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | ApartamentoCountOutputTypeCountApartamentoArgs
    ApartamentoServicios?: boolean | ApartamentoCountOutputTypeCountApartamentoServiciosArgs
    Contratos?: boolean | ApartamentoCountOutputTypeCountContratosArgs
  }

  // Custom InputTypes
  /**
   * ApartamentoCountOutputType without action
   */
  export type ApartamentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoCountOutputType
     */
    select?: ApartamentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApartamentoCountOutputType without action
   */
  export type ApartamentoCountOutputTypeCountApartamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HabitacionesWhereInput
  }

  /**
   * ApartamentoCountOutputType without action
   */
  export type ApartamentoCountOutputTypeCountApartamentoServiciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApartamentoServiciosWhereInput
  }

  /**
   * ApartamentoCountOutputType without action
   */
  export type ApartamentoCountOutputTypeCountContratosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContratosWhereInput
  }


  /**
   * Count Type TiposHabitacionCountOutputType
   */

  export type TiposHabitacionCountOutputType = {
    apartamento: number
  }

  export type TiposHabitacionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | TiposHabitacionCountOutputTypeCountApartamentoArgs
  }

  // Custom InputTypes
  /**
   * TiposHabitacionCountOutputType without action
   */
  export type TiposHabitacionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacionCountOutputType
     */
    select?: TiposHabitacionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TiposHabitacionCountOutputType without action
   */
  export type TiposHabitacionCountOutputTypeCountApartamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HabitacionesWhereInput
  }


  /**
   * Count Type ServiciosCountOutputType
   */

  export type ServiciosCountOutputType = {
    ApartamentoServicios: number
  }

  export type ServiciosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ApartamentoServicios?: boolean | ServiciosCountOutputTypeCountApartamentoServiciosArgs
  }

  // Custom InputTypes
  /**
   * ServiciosCountOutputType without action
   */
  export type ServiciosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiciosCountOutputType
     */
    select?: ServiciosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiciosCountOutputType without action
   */
  export type ServiciosCountOutputTypeCountApartamentoServiciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApartamentoServiciosWhereInput
  }


  /**
   * Count Type ContratosCountOutputType
   */

  export type ContratosCountOutputType = {
    recibos: number
  }

  export type ContratosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recibos?: boolean | ContratosCountOutputTypeCountRecibosArgs
  }

  // Custom InputTypes
  /**
   * ContratosCountOutputType without action
   */
  export type ContratosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContratosCountOutputType
     */
    select?: ContratosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContratosCountOutputType without action
   */
  export type ContratosCountOutputTypeCountRecibosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecibosWhereInput
  }


  /**
   * Count Type RecibosCountOutputType
   */

  export type RecibosCountOutputType = {
    detalles: number
  }

  export type RecibosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | RecibosCountOutputTypeCountDetallesArgs
  }

  // Custom InputTypes
  /**
   * RecibosCountOutputType without action
   */
  export type RecibosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecibosCountOutputType
     */
    select?: RecibosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecibosCountOutputType without action
   */
  export type RecibosCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReciboDetallesWhereInput
  }


  /**
   * Count Type PermisoCountOutputType
   */

  export type PermisoCountOutputType = {
    roles: number
  }

  export type PermisoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermisoCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermisoCountOutputType without action
   */
  export type PermisoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermisoCountOutputType
     */
    select?: PermisoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermisoCountOutputType without action
   */
  export type PermisoCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Rol
   */

  export type AggregateRol = {
    _count: RolCountAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  export type RolMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type RolMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type RolCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type RolMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type RolMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type RolCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type RolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rol to aggregate.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rols
    **/
    _count?: true | RolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolMaxAggregateInputType
  }

  export type GetRolAggregateType<T extends RolAggregateArgs> = {
        [P in keyof T & keyof AggregateRol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRol[P]>
      : GetScalarType<T[P], AggregateRol[P]>
  }




  export type RolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolWhereInput
    orderBy?: RolOrderByWithAggregationInput | RolOrderByWithAggregationInput[]
    by: RolScalarFieldEnum[] | RolScalarFieldEnum
    having?: RolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolCountAggregateInputType | true
    _min?: RolMinAggregateInputType
    _max?: RolMaxAggregateInputType
  }

  export type RolGroupByOutputType = {
    id: string
    nombre: string
    descripcion: string
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: RolCountAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  type GetRolGroupByPayload<T extends RolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolGroupByOutputType[P]>
            : GetScalarType<T[P], RolGroupByOutputType[P]>
        }
      >
    >


  export type RolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    permisos?: boolean | Rol$permisosArgs<ExtArgs>
    Usuario?: boolean | Rol$UsuarioArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rol"]>



  export type RolSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type RolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "descripcion" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["rol"]>
  export type RolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permisos?: boolean | Rol$permisosArgs<ExtArgs>
    Usuario?: boolean | Rol$UsuarioArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rol"
    objects: {
      permisos: Prisma.$RolPermisoPayload<ExtArgs>[]
      Usuario: Prisma.$UsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      descripcion: string
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["rol"]>
    composites: {}
  }

  type RolGetPayload<S extends boolean | null | undefined | RolDefaultArgs> = $Result.GetResult<Prisma.$RolPayload, S>

  type RolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolCountAggregateInputType | true
    }

  export interface RolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rol'], meta: { name: 'Rol' } }
    /**
     * Find zero or one Rol that matches the filter.
     * @param {RolFindUniqueArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolFindUniqueArgs>(args: SelectSubset<T, RolFindUniqueArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rol that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolFindUniqueOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolFindUniqueOrThrowArgs>(args: SelectSubset<T, RolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolFindFirstArgs>(args?: SelectSubset<T, RolFindFirstArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rol that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolFindFirstOrThrowArgs>(args?: SelectSubset<T, RolFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rols
     * const rols = await prisma.rol.findMany()
     * 
     * // Get first 10 Rols
     * const rols = await prisma.rol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolWithIdOnly = await prisma.rol.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolFindManyArgs>(args?: SelectSubset<T, RolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rol.
     * @param {RolCreateArgs} args - Arguments to create a Rol.
     * @example
     * // Create one Rol
     * const Rol = await prisma.rol.create({
     *   data: {
     *     // ... data to create a Rol
     *   }
     * })
     * 
     */
    create<T extends RolCreateArgs>(args: SelectSubset<T, RolCreateArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rols.
     * @param {RolCreateManyArgs} args - Arguments to create many Rols.
     * @example
     * // Create many Rols
     * const rol = await prisma.rol.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolCreateManyArgs>(args?: SelectSubset<T, RolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Rol.
     * @param {RolDeleteArgs} args - Arguments to delete one Rol.
     * @example
     * // Delete one Rol
     * const Rol = await prisma.rol.delete({
     *   where: {
     *     // ... filter to delete one Rol
     *   }
     * })
     * 
     */
    delete<T extends RolDeleteArgs>(args: SelectSubset<T, RolDeleteArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rol.
     * @param {RolUpdateArgs} args - Arguments to update one Rol.
     * @example
     * // Update one Rol
     * const rol = await prisma.rol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolUpdateArgs>(args: SelectSubset<T, RolUpdateArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rols.
     * @param {RolDeleteManyArgs} args - Arguments to filter Rols to delete.
     * @example
     * // Delete a few Rols
     * const { count } = await prisma.rol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolDeleteManyArgs>(args?: SelectSubset<T, RolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rols
     * const rol = await prisma.rol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolUpdateManyArgs>(args: SelectSubset<T, RolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Rol.
     * @param {RolUpsertArgs} args - Arguments to update or create a Rol.
     * @example
     * // Update or create a Rol
     * const rol = await prisma.rol.upsert({
     *   create: {
     *     // ... data to create a Rol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rol we want to update
     *   }
     * })
     */
    upsert<T extends RolUpsertArgs>(args: SelectSubset<T, RolUpsertArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolCountArgs} args - Arguments to filter Rols to count.
     * @example
     * // Count the number of Rols
     * const count = await prisma.rol.count({
     *   where: {
     *     // ... the filter for the Rols we want to count
     *   }
     * })
    **/
    count<T extends RolCountArgs>(
      args?: Subset<T, RolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolAggregateArgs>(args: Subset<T, RolAggregateArgs>): Prisma.PrismaPromise<GetRolAggregateType<T>>

    /**
     * Group by Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolGroupByArgs['orderBy'] }
        : { orderBy?: RolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rol model
   */
  readonly fields: RolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permisos<T extends Rol$permisosArgs<ExtArgs> = {}>(args?: Subset<T, Rol$permisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Usuario<T extends Rol$UsuarioArgs<ExtArgs> = {}>(args?: Subset<T, Rol$UsuarioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rol model
   */
  interface RolFieldRefs {
    readonly id: FieldRef<"Rol", 'String'>
    readonly nombre: FieldRef<"Rol", 'String'>
    readonly descripcion: FieldRef<"Rol", 'String'>
    readonly createAt: FieldRef<"Rol", 'DateTime'>
    readonly updateAt: FieldRef<"Rol", 'DateTime'>
    readonly activo: FieldRef<"Rol", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Rol findUnique
   */
  export type RolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol findUniqueOrThrow
   */
  export type RolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol findFirst
   */
  export type RolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol findFirstOrThrow
   */
  export type RolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol findMany
   */
  export type RolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rols to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol create
   */
  export type RolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to create a Rol.
     */
    data: XOR<RolCreateInput, RolUncheckedCreateInput>
  }

  /**
   * Rol createMany
   */
  export type RolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rols.
     */
    data: RolCreateManyInput | RolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rol update
   */
  export type RolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to update a Rol.
     */
    data: XOR<RolUpdateInput, RolUncheckedUpdateInput>
    /**
     * Choose, which Rol to update.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol updateMany
   */
  export type RolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rols.
     */
    data: XOR<RolUpdateManyMutationInput, RolUncheckedUpdateManyInput>
    /**
     * Filter which Rols to update
     */
    where?: RolWhereInput
    /**
     * Limit how many Rols to update.
     */
    limit?: number
  }

  /**
   * Rol upsert
   */
  export type RolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The filter to search for the Rol to update in case it exists.
     */
    where: RolWhereUniqueInput
    /**
     * In case the Rol found by the `where` argument doesn't exist, create a new Rol with this data.
     */
    create: XOR<RolCreateInput, RolUncheckedCreateInput>
    /**
     * In case the Rol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolUpdateInput, RolUncheckedUpdateInput>
  }

  /**
   * Rol delete
   */
  export type RolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter which Rol to delete.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol deleteMany
   */
  export type RolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rols to delete
     */
    where?: RolWhereInput
    /**
     * Limit how many Rols to delete.
     */
    limit?: number
  }

  /**
   * Rol.permisos
   */
  export type Rol$permisosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    cursor?: RolPermisoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }

  /**
   * Rol.Usuario
   */
  export type Rol$UsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Rol without action
   */
  export type RolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
  }


  /**
   * Model Inquilino
   */

  export type AggregateInquilino = {
    _count: InquilinoCountAggregateOutputType | null
    _min: InquilinoMinAggregateOutputType | null
    _max: InquilinoMaxAggregateOutputType | null
  }

  export type InquilinoMinAggregateOutputType = {
    id: string | null
    nombreCompleto: string | null
    dni: string | null
    numero: string | null
    correo: string | null
    fechaNacimiento: Date | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type InquilinoMaxAggregateOutputType = {
    id: string | null
    nombreCompleto: string | null
    dni: string | null
    numero: string | null
    correo: string | null
    fechaNacimiento: Date | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type InquilinoCountAggregateOutputType = {
    id: number
    nombreCompleto: number
    dni: number
    numero: number
    correo: number
    fechaNacimiento: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type InquilinoMinAggregateInputType = {
    id?: true
    nombreCompleto?: true
    dni?: true
    numero?: true
    correo?: true
    fechaNacimiento?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type InquilinoMaxAggregateInputType = {
    id?: true
    nombreCompleto?: true
    dni?: true
    numero?: true
    correo?: true
    fechaNacimiento?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type InquilinoCountAggregateInputType = {
    id?: true
    nombreCompleto?: true
    dni?: true
    numero?: true
    correo?: true
    fechaNacimiento?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type InquilinoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquilino to aggregate.
     */
    where?: InquilinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquilinos to fetch.
     */
    orderBy?: InquilinoOrderByWithRelationInput | InquilinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquilinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquilinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquilinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inquilinos
    **/
    _count?: true | InquilinoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquilinoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquilinoMaxAggregateInputType
  }

  export type GetInquilinoAggregateType<T extends InquilinoAggregateArgs> = {
        [P in keyof T & keyof AggregateInquilino]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquilino[P]>
      : GetScalarType<T[P], AggregateInquilino[P]>
  }




  export type InquilinoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquilinoWhereInput
    orderBy?: InquilinoOrderByWithAggregationInput | InquilinoOrderByWithAggregationInput[]
    by: InquilinoScalarFieldEnum[] | InquilinoScalarFieldEnum
    having?: InquilinoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquilinoCountAggregateInputType | true
    _min?: InquilinoMinAggregateInputType
    _max?: InquilinoMaxAggregateInputType
  }

  export type InquilinoGroupByOutputType = {
    id: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: InquilinoCountAggregateOutputType | null
    _min: InquilinoMinAggregateOutputType | null
    _max: InquilinoMaxAggregateOutputType | null
  }

  type GetInquilinoGroupByPayload<T extends InquilinoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquilinoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquilinoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquilinoGroupByOutputType[P]>
            : GetScalarType<T[P], InquilinoGroupByOutputType[P]>
        }
      >
    >


  export type InquilinoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombreCompleto?: boolean
    dni?: boolean
    numero?: boolean
    correo?: boolean
    fechaNacimiento?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    Acompañante?: boolean | Inquilino$AcompañanteArgs<ExtArgs>
    Contratos?: boolean | Inquilino$ContratosArgs<ExtArgs>
    _count?: boolean | InquilinoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inquilino"]>



  export type InquilinoSelectScalar = {
    id?: boolean
    nombreCompleto?: boolean
    dni?: boolean
    numero?: boolean
    correo?: boolean
    fechaNacimiento?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type InquilinoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombreCompleto" | "dni" | "numero" | "correo" | "fechaNacimiento" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["inquilino"]>
  export type InquilinoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Acompañante?: boolean | Inquilino$AcompañanteArgs<ExtArgs>
    Contratos?: boolean | Inquilino$ContratosArgs<ExtArgs>
    _count?: boolean | InquilinoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InquilinoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inquilino"
    objects: {
      Acompañante: Prisma.$AcompañantePayload<ExtArgs>[]
      Contratos: Prisma.$ContratosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombreCompleto: string
      dni: string
      numero: string
      correo: string
      fechaNacimiento: Date
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["inquilino"]>
    composites: {}
  }

  type InquilinoGetPayload<S extends boolean | null | undefined | InquilinoDefaultArgs> = $Result.GetResult<Prisma.$InquilinoPayload, S>

  type InquilinoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquilinoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquilinoCountAggregateInputType | true
    }

  export interface InquilinoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inquilino'], meta: { name: 'Inquilino' } }
    /**
     * Find zero or one Inquilino that matches the filter.
     * @param {InquilinoFindUniqueArgs} args - Arguments to find a Inquilino
     * @example
     * // Get one Inquilino
     * const inquilino = await prisma.inquilino.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquilinoFindUniqueArgs>(args: SelectSubset<T, InquilinoFindUniqueArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inquilino that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquilinoFindUniqueOrThrowArgs} args - Arguments to find a Inquilino
     * @example
     * // Get one Inquilino
     * const inquilino = await prisma.inquilino.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquilinoFindUniqueOrThrowArgs>(args: SelectSubset<T, InquilinoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquilino that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoFindFirstArgs} args - Arguments to find a Inquilino
     * @example
     * // Get one Inquilino
     * const inquilino = await prisma.inquilino.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquilinoFindFirstArgs>(args?: SelectSubset<T, InquilinoFindFirstArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquilino that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoFindFirstOrThrowArgs} args - Arguments to find a Inquilino
     * @example
     * // Get one Inquilino
     * const inquilino = await prisma.inquilino.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquilinoFindFirstOrThrowArgs>(args?: SelectSubset<T, InquilinoFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inquilinos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inquilinos
     * const inquilinos = await prisma.inquilino.findMany()
     * 
     * // Get first 10 Inquilinos
     * const inquilinos = await prisma.inquilino.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquilinoWithIdOnly = await prisma.inquilino.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquilinoFindManyArgs>(args?: SelectSubset<T, InquilinoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inquilino.
     * @param {InquilinoCreateArgs} args - Arguments to create a Inquilino.
     * @example
     * // Create one Inquilino
     * const Inquilino = await prisma.inquilino.create({
     *   data: {
     *     // ... data to create a Inquilino
     *   }
     * })
     * 
     */
    create<T extends InquilinoCreateArgs>(args: SelectSubset<T, InquilinoCreateArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inquilinos.
     * @param {InquilinoCreateManyArgs} args - Arguments to create many Inquilinos.
     * @example
     * // Create many Inquilinos
     * const inquilino = await prisma.inquilino.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquilinoCreateManyArgs>(args?: SelectSubset<T, InquilinoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Inquilino.
     * @param {InquilinoDeleteArgs} args - Arguments to delete one Inquilino.
     * @example
     * // Delete one Inquilino
     * const Inquilino = await prisma.inquilino.delete({
     *   where: {
     *     // ... filter to delete one Inquilino
     *   }
     * })
     * 
     */
    delete<T extends InquilinoDeleteArgs>(args: SelectSubset<T, InquilinoDeleteArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inquilino.
     * @param {InquilinoUpdateArgs} args - Arguments to update one Inquilino.
     * @example
     * // Update one Inquilino
     * const inquilino = await prisma.inquilino.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquilinoUpdateArgs>(args: SelectSubset<T, InquilinoUpdateArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inquilinos.
     * @param {InquilinoDeleteManyArgs} args - Arguments to filter Inquilinos to delete.
     * @example
     * // Delete a few Inquilinos
     * const { count } = await prisma.inquilino.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquilinoDeleteManyArgs>(args?: SelectSubset<T, InquilinoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquilinos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inquilinos
     * const inquilino = await prisma.inquilino.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquilinoUpdateManyArgs>(args: SelectSubset<T, InquilinoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Inquilino.
     * @param {InquilinoUpsertArgs} args - Arguments to update or create a Inquilino.
     * @example
     * // Update or create a Inquilino
     * const inquilino = await prisma.inquilino.upsert({
     *   create: {
     *     // ... data to create a Inquilino
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inquilino we want to update
     *   }
     * })
     */
    upsert<T extends InquilinoUpsertArgs>(args: SelectSubset<T, InquilinoUpsertArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inquilinos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoCountArgs} args - Arguments to filter Inquilinos to count.
     * @example
     * // Count the number of Inquilinos
     * const count = await prisma.inquilino.count({
     *   where: {
     *     // ... the filter for the Inquilinos we want to count
     *   }
     * })
    **/
    count<T extends InquilinoCountArgs>(
      args?: Subset<T, InquilinoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquilinoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inquilino.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquilinoAggregateArgs>(args: Subset<T, InquilinoAggregateArgs>): Prisma.PrismaPromise<GetInquilinoAggregateType<T>>

    /**
     * Group by Inquilino.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquilinoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquilinoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquilinoGroupByArgs['orderBy'] }
        : { orderBy?: InquilinoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquilinoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquilinoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inquilino model
   */
  readonly fields: InquilinoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inquilino.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquilinoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Acompañante<T extends Inquilino$AcompañanteArgs<ExtArgs> = {}>(args?: Subset<T, Inquilino$AcompañanteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Contratos<T extends Inquilino$ContratosArgs<ExtArgs> = {}>(args?: Subset<T, Inquilino$ContratosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inquilino model
   */
  interface InquilinoFieldRefs {
    readonly id: FieldRef<"Inquilino", 'String'>
    readonly nombreCompleto: FieldRef<"Inquilino", 'String'>
    readonly dni: FieldRef<"Inquilino", 'String'>
    readonly numero: FieldRef<"Inquilino", 'String'>
    readonly correo: FieldRef<"Inquilino", 'String'>
    readonly fechaNacimiento: FieldRef<"Inquilino", 'DateTime'>
    readonly createAt: FieldRef<"Inquilino", 'DateTime'>
    readonly updateAt: FieldRef<"Inquilino", 'DateTime'>
    readonly activo: FieldRef<"Inquilino", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Inquilino findUnique
   */
  export type InquilinoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter, which Inquilino to fetch.
     */
    where: InquilinoWhereUniqueInput
  }

  /**
   * Inquilino findUniqueOrThrow
   */
  export type InquilinoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter, which Inquilino to fetch.
     */
    where: InquilinoWhereUniqueInput
  }

  /**
   * Inquilino findFirst
   */
  export type InquilinoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter, which Inquilino to fetch.
     */
    where?: InquilinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquilinos to fetch.
     */
    orderBy?: InquilinoOrderByWithRelationInput | InquilinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquilinos.
     */
    cursor?: InquilinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquilinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquilinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquilinos.
     */
    distinct?: InquilinoScalarFieldEnum | InquilinoScalarFieldEnum[]
  }

  /**
   * Inquilino findFirstOrThrow
   */
  export type InquilinoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter, which Inquilino to fetch.
     */
    where?: InquilinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquilinos to fetch.
     */
    orderBy?: InquilinoOrderByWithRelationInput | InquilinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquilinos.
     */
    cursor?: InquilinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquilinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquilinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquilinos.
     */
    distinct?: InquilinoScalarFieldEnum | InquilinoScalarFieldEnum[]
  }

  /**
   * Inquilino findMany
   */
  export type InquilinoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter, which Inquilinos to fetch.
     */
    where?: InquilinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquilinos to fetch.
     */
    orderBy?: InquilinoOrderByWithRelationInput | InquilinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inquilinos.
     */
    cursor?: InquilinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquilinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquilinos.
     */
    skip?: number
    distinct?: InquilinoScalarFieldEnum | InquilinoScalarFieldEnum[]
  }

  /**
   * Inquilino create
   */
  export type InquilinoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * The data needed to create a Inquilino.
     */
    data: XOR<InquilinoCreateInput, InquilinoUncheckedCreateInput>
  }

  /**
   * Inquilino createMany
   */
  export type InquilinoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inquilinos.
     */
    data: InquilinoCreateManyInput | InquilinoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquilino update
   */
  export type InquilinoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * The data needed to update a Inquilino.
     */
    data: XOR<InquilinoUpdateInput, InquilinoUncheckedUpdateInput>
    /**
     * Choose, which Inquilino to update.
     */
    where: InquilinoWhereUniqueInput
  }

  /**
   * Inquilino updateMany
   */
  export type InquilinoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inquilinos.
     */
    data: XOR<InquilinoUpdateManyMutationInput, InquilinoUncheckedUpdateManyInput>
    /**
     * Filter which Inquilinos to update
     */
    where?: InquilinoWhereInput
    /**
     * Limit how many Inquilinos to update.
     */
    limit?: number
  }

  /**
   * Inquilino upsert
   */
  export type InquilinoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * The filter to search for the Inquilino to update in case it exists.
     */
    where: InquilinoWhereUniqueInput
    /**
     * In case the Inquilino found by the `where` argument doesn't exist, create a new Inquilino with this data.
     */
    create: XOR<InquilinoCreateInput, InquilinoUncheckedCreateInput>
    /**
     * In case the Inquilino was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquilinoUpdateInput, InquilinoUncheckedUpdateInput>
  }

  /**
   * Inquilino delete
   */
  export type InquilinoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
    /**
     * Filter which Inquilino to delete.
     */
    where: InquilinoWhereUniqueInput
  }

  /**
   * Inquilino deleteMany
   */
  export type InquilinoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquilinos to delete
     */
    where?: InquilinoWhereInput
    /**
     * Limit how many Inquilinos to delete.
     */
    limit?: number
  }

  /**
   * Inquilino.Acompañante
   */
  export type Inquilino$AcompañanteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    where?: AcompañanteWhereInput
    orderBy?: AcompañanteOrderByWithRelationInput | AcompañanteOrderByWithRelationInput[]
    cursor?: AcompañanteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcompañanteScalarFieldEnum | AcompañanteScalarFieldEnum[]
  }

  /**
   * Inquilino.Contratos
   */
  export type Inquilino$ContratosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    where?: ContratosWhereInput
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    cursor?: ContratosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContratosScalarFieldEnum | ContratosScalarFieldEnum[]
  }

  /**
   * Inquilino without action
   */
  export type InquilinoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquilino
     */
    select?: InquilinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquilino
     */
    omit?: InquilinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquilinoInclude<ExtArgs> | null
  }


  /**
   * Model Acompañante
   */

  export type AggregateAcompañante = {
    _count: AcompañanteCountAggregateOutputType | null
    _min: AcompañanteMinAggregateOutputType | null
    _max: AcompañanteMaxAggregateOutputType | null
  }

  export type AcompañanteMinAggregateOutputType = {
    id: string | null
    nombreCompleto: string | null
    inquilinoId: string | null
    Parentesco: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type AcompañanteMaxAggregateOutputType = {
    id: string | null
    nombreCompleto: string | null
    inquilinoId: string | null
    Parentesco: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type AcompañanteCountAggregateOutputType = {
    id: number
    nombreCompleto: number
    inquilinoId: number
    Parentesco: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type AcompañanteMinAggregateInputType = {
    id?: true
    nombreCompleto?: true
    inquilinoId?: true
    Parentesco?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type AcompañanteMaxAggregateInputType = {
    id?: true
    nombreCompleto?: true
    inquilinoId?: true
    Parentesco?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type AcompañanteCountAggregateInputType = {
    id?: true
    nombreCompleto?: true
    inquilinoId?: true
    Parentesco?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type AcompañanteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Acompañante to aggregate.
     */
    where?: AcompañanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acompañantes to fetch.
     */
    orderBy?: AcompañanteOrderByWithRelationInput | AcompañanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcompañanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acompañantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acompañantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Acompañantes
    **/
    _count?: true | AcompañanteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcompañanteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcompañanteMaxAggregateInputType
  }

  export type GetAcompañanteAggregateType<T extends AcompañanteAggregateArgs> = {
        [P in keyof T & keyof AggregateAcompañante]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcompañante[P]>
      : GetScalarType<T[P], AggregateAcompañante[P]>
  }




  export type AcompañanteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcompañanteWhereInput
    orderBy?: AcompañanteOrderByWithAggregationInput | AcompañanteOrderByWithAggregationInput[]
    by: AcompañanteScalarFieldEnum[] | AcompañanteScalarFieldEnum
    having?: AcompañanteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcompañanteCountAggregateInputType | true
    _min?: AcompañanteMinAggregateInputType
    _max?: AcompañanteMaxAggregateInputType
  }

  export type AcompañanteGroupByOutputType = {
    id: string
    nombreCompleto: string
    inquilinoId: string
    Parentesco: string
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: AcompañanteCountAggregateOutputType | null
    _min: AcompañanteMinAggregateOutputType | null
    _max: AcompañanteMaxAggregateOutputType | null
  }

  type GetAcompañanteGroupByPayload<T extends AcompañanteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcompañanteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcompañanteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcompañanteGroupByOutputType[P]>
            : GetScalarType<T[P], AcompañanteGroupByOutputType[P]>
        }
      >
    >


  export type AcompañanteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombreCompleto?: boolean
    inquilinoId?: boolean
    Parentesco?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    inquilino?: boolean | InquilinoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acompañante"]>



  export type AcompañanteSelectScalar = {
    id?: boolean
    nombreCompleto?: boolean
    inquilinoId?: boolean
    Parentesco?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type AcompañanteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombreCompleto" | "inquilinoId" | "Parentesco" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["acompañante"]>
  export type AcompañanteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquilino?: boolean | InquilinoDefaultArgs<ExtArgs>
  }

  export type $AcompañantePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Acompañante"
    objects: {
      inquilino: Prisma.$InquilinoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombreCompleto: string
      inquilinoId: string
      Parentesco: string
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["acompañante"]>
    composites: {}
  }

  type AcompañanteGetPayload<S extends boolean | null | undefined | AcompañanteDefaultArgs> = $Result.GetResult<Prisma.$AcompañantePayload, S>

  type AcompañanteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcompañanteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcompañanteCountAggregateInputType | true
    }

  export interface AcompañanteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Acompañante'], meta: { name: 'Acompañante' } }
    /**
     * Find zero or one Acompañante that matches the filter.
     * @param {AcompañanteFindUniqueArgs} args - Arguments to find a Acompañante
     * @example
     * // Get one Acompañante
     * const acompañante = await prisma.acompañante.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcompañanteFindUniqueArgs>(args: SelectSubset<T, AcompañanteFindUniqueArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Acompañante that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcompañanteFindUniqueOrThrowArgs} args - Arguments to find a Acompañante
     * @example
     * // Get one Acompañante
     * const acompañante = await prisma.acompañante.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcompañanteFindUniqueOrThrowArgs>(args: SelectSubset<T, AcompañanteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Acompañante that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteFindFirstArgs} args - Arguments to find a Acompañante
     * @example
     * // Get one Acompañante
     * const acompañante = await prisma.acompañante.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcompañanteFindFirstArgs>(args?: SelectSubset<T, AcompañanteFindFirstArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Acompañante that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteFindFirstOrThrowArgs} args - Arguments to find a Acompañante
     * @example
     * // Get one Acompañante
     * const acompañante = await prisma.acompañante.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcompañanteFindFirstOrThrowArgs>(args?: SelectSubset<T, AcompañanteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Acompañantes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Acompañantes
     * const acompañantes = await prisma.acompañante.findMany()
     * 
     * // Get first 10 Acompañantes
     * const acompañantes = await prisma.acompañante.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acompañanteWithIdOnly = await prisma.acompañante.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcompañanteFindManyArgs>(args?: SelectSubset<T, AcompañanteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Acompañante.
     * @param {AcompañanteCreateArgs} args - Arguments to create a Acompañante.
     * @example
     * // Create one Acompañante
     * const Acompañante = await prisma.acompañante.create({
     *   data: {
     *     // ... data to create a Acompañante
     *   }
     * })
     * 
     */
    create<T extends AcompañanteCreateArgs>(args: SelectSubset<T, AcompañanteCreateArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Acompañantes.
     * @param {AcompañanteCreateManyArgs} args - Arguments to create many Acompañantes.
     * @example
     * // Create many Acompañantes
     * const acompañante = await prisma.acompañante.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcompañanteCreateManyArgs>(args?: SelectSubset<T, AcompañanteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Acompañante.
     * @param {AcompañanteDeleteArgs} args - Arguments to delete one Acompañante.
     * @example
     * // Delete one Acompañante
     * const Acompañante = await prisma.acompañante.delete({
     *   where: {
     *     // ... filter to delete one Acompañante
     *   }
     * })
     * 
     */
    delete<T extends AcompañanteDeleteArgs>(args: SelectSubset<T, AcompañanteDeleteArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Acompañante.
     * @param {AcompañanteUpdateArgs} args - Arguments to update one Acompañante.
     * @example
     * // Update one Acompañante
     * const acompañante = await prisma.acompañante.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcompañanteUpdateArgs>(args: SelectSubset<T, AcompañanteUpdateArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Acompañantes.
     * @param {AcompañanteDeleteManyArgs} args - Arguments to filter Acompañantes to delete.
     * @example
     * // Delete a few Acompañantes
     * const { count } = await prisma.acompañante.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcompañanteDeleteManyArgs>(args?: SelectSubset<T, AcompañanteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acompañantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Acompañantes
     * const acompañante = await prisma.acompañante.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcompañanteUpdateManyArgs>(args: SelectSubset<T, AcompañanteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Acompañante.
     * @param {AcompañanteUpsertArgs} args - Arguments to update or create a Acompañante.
     * @example
     * // Update or create a Acompañante
     * const acompañante = await prisma.acompañante.upsert({
     *   create: {
     *     // ... data to create a Acompañante
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Acompañante we want to update
     *   }
     * })
     */
    upsert<T extends AcompañanteUpsertArgs>(args: SelectSubset<T, AcompañanteUpsertArgs<ExtArgs>>): Prisma__AcompañanteClient<$Result.GetResult<Prisma.$AcompañantePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Acompañantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteCountArgs} args - Arguments to filter Acompañantes to count.
     * @example
     * // Count the number of Acompañantes
     * const count = await prisma.acompañante.count({
     *   where: {
     *     // ... the filter for the Acompañantes we want to count
     *   }
     * })
    **/
    count<T extends AcompañanteCountArgs>(
      args?: Subset<T, AcompañanteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcompañanteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Acompañante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcompañanteAggregateArgs>(args: Subset<T, AcompañanteAggregateArgs>): Prisma.PrismaPromise<GetAcompañanteAggregateType<T>>

    /**
     * Group by Acompañante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcompañanteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcompañanteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcompañanteGroupByArgs['orderBy'] }
        : { orderBy?: AcompañanteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcompañanteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcompañanteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Acompañante model
   */
  readonly fields: AcompañanteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Acompañante.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcompañanteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquilino<T extends InquilinoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InquilinoDefaultArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Acompañante model
   */
  interface AcompañanteFieldRefs {
    readonly id: FieldRef<"Acompañante", 'String'>
    readonly nombreCompleto: FieldRef<"Acompañante", 'String'>
    readonly inquilinoId: FieldRef<"Acompañante", 'String'>
    readonly Parentesco: FieldRef<"Acompañante", 'String'>
    readonly createAt: FieldRef<"Acompañante", 'DateTime'>
    readonly updateAt: FieldRef<"Acompañante", 'DateTime'>
    readonly activo: FieldRef<"Acompañante", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Acompañante findUnique
   */
  export type AcompañanteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter, which Acompañante to fetch.
     */
    where: AcompañanteWhereUniqueInput
  }

  /**
   * Acompañante findUniqueOrThrow
   */
  export type AcompañanteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter, which Acompañante to fetch.
     */
    where: AcompañanteWhereUniqueInput
  }

  /**
   * Acompañante findFirst
   */
  export type AcompañanteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter, which Acompañante to fetch.
     */
    where?: AcompañanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acompañantes to fetch.
     */
    orderBy?: AcompañanteOrderByWithRelationInput | AcompañanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acompañantes.
     */
    cursor?: AcompañanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acompañantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acompañantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acompañantes.
     */
    distinct?: AcompañanteScalarFieldEnum | AcompañanteScalarFieldEnum[]
  }

  /**
   * Acompañante findFirstOrThrow
   */
  export type AcompañanteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter, which Acompañante to fetch.
     */
    where?: AcompañanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acompañantes to fetch.
     */
    orderBy?: AcompañanteOrderByWithRelationInput | AcompañanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acompañantes.
     */
    cursor?: AcompañanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acompañantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acompañantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acompañantes.
     */
    distinct?: AcompañanteScalarFieldEnum | AcompañanteScalarFieldEnum[]
  }

  /**
   * Acompañante findMany
   */
  export type AcompañanteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter, which Acompañantes to fetch.
     */
    where?: AcompañanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acompañantes to fetch.
     */
    orderBy?: AcompañanteOrderByWithRelationInput | AcompañanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Acompañantes.
     */
    cursor?: AcompañanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acompañantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acompañantes.
     */
    skip?: number
    distinct?: AcompañanteScalarFieldEnum | AcompañanteScalarFieldEnum[]
  }

  /**
   * Acompañante create
   */
  export type AcompañanteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * The data needed to create a Acompañante.
     */
    data: XOR<AcompañanteCreateInput, AcompañanteUncheckedCreateInput>
  }

  /**
   * Acompañante createMany
   */
  export type AcompañanteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Acompañantes.
     */
    data: AcompañanteCreateManyInput | AcompañanteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Acompañante update
   */
  export type AcompañanteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * The data needed to update a Acompañante.
     */
    data: XOR<AcompañanteUpdateInput, AcompañanteUncheckedUpdateInput>
    /**
     * Choose, which Acompañante to update.
     */
    where: AcompañanteWhereUniqueInput
  }

  /**
   * Acompañante updateMany
   */
  export type AcompañanteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Acompañantes.
     */
    data: XOR<AcompañanteUpdateManyMutationInput, AcompañanteUncheckedUpdateManyInput>
    /**
     * Filter which Acompañantes to update
     */
    where?: AcompañanteWhereInput
    /**
     * Limit how many Acompañantes to update.
     */
    limit?: number
  }

  /**
   * Acompañante upsert
   */
  export type AcompañanteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * The filter to search for the Acompañante to update in case it exists.
     */
    where: AcompañanteWhereUniqueInput
    /**
     * In case the Acompañante found by the `where` argument doesn't exist, create a new Acompañante with this data.
     */
    create: XOR<AcompañanteCreateInput, AcompañanteUncheckedCreateInput>
    /**
     * In case the Acompañante was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcompañanteUpdateInput, AcompañanteUncheckedUpdateInput>
  }

  /**
   * Acompañante delete
   */
  export type AcompañanteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
    /**
     * Filter which Acompañante to delete.
     */
    where: AcompañanteWhereUniqueInput
  }

  /**
   * Acompañante deleteMany
   */
  export type AcompañanteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Acompañantes to delete
     */
    where?: AcompañanteWhereInput
    /**
     * Limit how many Acompañantes to delete.
     */
    limit?: number
  }

  /**
   * Acompañante without action
   */
  export type AcompañanteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acompañante
     */
    select?: AcompañanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acompañante
     */
    omit?: AcompañanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcompañanteInclude<ExtArgs> | null
  }


  /**
   * Model Apartamento
   */

  export type AggregateApartamento = {
    _count: ApartamentoCountAggregateOutputType | null
    _min: ApartamentoMinAggregateOutputType | null
    _max: ApartamentoMaxAggregateOutputType | null
  }

  export type ApartamentoMinAggregateOutputType = {
    id: string | null
    numero: string | null
    direccion: string | null
    createAt: Date | null
    updateAt: Date | null
    disponible: boolean | null
    activo: boolean | null
  }

  export type ApartamentoMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    direccion: string | null
    createAt: Date | null
    updateAt: Date | null
    disponible: boolean | null
    activo: boolean | null
  }

  export type ApartamentoCountAggregateOutputType = {
    id: number
    numero: number
    direccion: number
    createAt: number
    updateAt: number
    disponible: number
    activo: number
    _all: number
  }


  export type ApartamentoMinAggregateInputType = {
    id?: true
    numero?: true
    direccion?: true
    createAt?: true
    updateAt?: true
    disponible?: true
    activo?: true
  }

  export type ApartamentoMaxAggregateInputType = {
    id?: true
    numero?: true
    direccion?: true
    createAt?: true
    updateAt?: true
    disponible?: true
    activo?: true
  }

  export type ApartamentoCountAggregateInputType = {
    id?: true
    numero?: true
    direccion?: true
    createAt?: true
    updateAt?: true
    disponible?: true
    activo?: true
    _all?: true
  }

  export type ApartamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Apartamento to aggregate.
     */
    where?: ApartamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apartamentos to fetch.
     */
    orderBy?: ApartamentoOrderByWithRelationInput | ApartamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApartamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apartamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apartamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Apartamentos
    **/
    _count?: true | ApartamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApartamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApartamentoMaxAggregateInputType
  }

  export type GetApartamentoAggregateType<T extends ApartamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateApartamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApartamento[P]>
      : GetScalarType<T[P], AggregateApartamento[P]>
  }




  export type ApartamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApartamentoWhereInput
    orderBy?: ApartamentoOrderByWithAggregationInput | ApartamentoOrderByWithAggregationInput[]
    by: ApartamentoScalarFieldEnum[] | ApartamentoScalarFieldEnum
    having?: ApartamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApartamentoCountAggregateInputType | true
    _min?: ApartamentoMinAggregateInputType
    _max?: ApartamentoMaxAggregateInputType
  }

  export type ApartamentoGroupByOutputType = {
    id: string
    numero: string
    direccion: string | null
    createAt: Date
    updateAt: Date
    disponible: boolean
    activo: boolean
    _count: ApartamentoCountAggregateOutputType | null
    _min: ApartamentoMinAggregateOutputType | null
    _max: ApartamentoMaxAggregateOutputType | null
  }

  type GetApartamentoGroupByPayload<T extends ApartamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApartamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApartamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApartamentoGroupByOutputType[P]>
            : GetScalarType<T[P], ApartamentoGroupByOutputType[P]>
        }
      >
    >


  export type ApartamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    direccion?: boolean
    createAt?: boolean
    updateAt?: boolean
    disponible?: boolean
    activo?: boolean
    apartamento?: boolean | Apartamento$apartamentoArgs<ExtArgs>
    ApartamentoServicios?: boolean | Apartamento$ApartamentoServiciosArgs<ExtArgs>
    Contratos?: boolean | Apartamento$ContratosArgs<ExtArgs>
    _count?: boolean | ApartamentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apartamento"]>



  export type ApartamentoSelectScalar = {
    id?: boolean
    numero?: boolean
    direccion?: boolean
    createAt?: boolean
    updateAt?: boolean
    disponible?: boolean
    activo?: boolean
  }

  export type ApartamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "direccion" | "createAt" | "updateAt" | "disponible" | "activo", ExtArgs["result"]["apartamento"]>
  export type ApartamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | Apartamento$apartamentoArgs<ExtArgs>
    ApartamentoServicios?: boolean | Apartamento$ApartamentoServiciosArgs<ExtArgs>
    Contratos?: boolean | Apartamento$ContratosArgs<ExtArgs>
    _count?: boolean | ApartamentoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ApartamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Apartamento"
    objects: {
      apartamento: Prisma.$HabitacionesPayload<ExtArgs>[]
      ApartamentoServicios: Prisma.$ApartamentoServiciosPayload<ExtArgs>[]
      Contratos: Prisma.$ContratosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      direccion: string | null
      createAt: Date
      updateAt: Date
      disponible: boolean
      activo: boolean
    }, ExtArgs["result"]["apartamento"]>
    composites: {}
  }

  type ApartamentoGetPayload<S extends boolean | null | undefined | ApartamentoDefaultArgs> = $Result.GetResult<Prisma.$ApartamentoPayload, S>

  type ApartamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApartamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApartamentoCountAggregateInputType | true
    }

  export interface ApartamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Apartamento'], meta: { name: 'Apartamento' } }
    /**
     * Find zero or one Apartamento that matches the filter.
     * @param {ApartamentoFindUniqueArgs} args - Arguments to find a Apartamento
     * @example
     * // Get one Apartamento
     * const apartamento = await prisma.apartamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApartamentoFindUniqueArgs>(args: SelectSubset<T, ApartamentoFindUniqueArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Apartamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApartamentoFindUniqueOrThrowArgs} args - Arguments to find a Apartamento
     * @example
     * // Get one Apartamento
     * const apartamento = await prisma.apartamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApartamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, ApartamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Apartamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoFindFirstArgs} args - Arguments to find a Apartamento
     * @example
     * // Get one Apartamento
     * const apartamento = await prisma.apartamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApartamentoFindFirstArgs>(args?: SelectSubset<T, ApartamentoFindFirstArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Apartamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoFindFirstOrThrowArgs} args - Arguments to find a Apartamento
     * @example
     * // Get one Apartamento
     * const apartamento = await prisma.apartamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApartamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, ApartamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Apartamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Apartamentos
     * const apartamentos = await prisma.apartamento.findMany()
     * 
     * // Get first 10 Apartamentos
     * const apartamentos = await prisma.apartamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apartamentoWithIdOnly = await prisma.apartamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApartamentoFindManyArgs>(args?: SelectSubset<T, ApartamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Apartamento.
     * @param {ApartamentoCreateArgs} args - Arguments to create a Apartamento.
     * @example
     * // Create one Apartamento
     * const Apartamento = await prisma.apartamento.create({
     *   data: {
     *     // ... data to create a Apartamento
     *   }
     * })
     * 
     */
    create<T extends ApartamentoCreateArgs>(args: SelectSubset<T, ApartamentoCreateArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Apartamentos.
     * @param {ApartamentoCreateManyArgs} args - Arguments to create many Apartamentos.
     * @example
     * // Create many Apartamentos
     * const apartamento = await prisma.apartamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApartamentoCreateManyArgs>(args?: SelectSubset<T, ApartamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Apartamento.
     * @param {ApartamentoDeleteArgs} args - Arguments to delete one Apartamento.
     * @example
     * // Delete one Apartamento
     * const Apartamento = await prisma.apartamento.delete({
     *   where: {
     *     // ... filter to delete one Apartamento
     *   }
     * })
     * 
     */
    delete<T extends ApartamentoDeleteArgs>(args: SelectSubset<T, ApartamentoDeleteArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Apartamento.
     * @param {ApartamentoUpdateArgs} args - Arguments to update one Apartamento.
     * @example
     * // Update one Apartamento
     * const apartamento = await prisma.apartamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApartamentoUpdateArgs>(args: SelectSubset<T, ApartamentoUpdateArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Apartamentos.
     * @param {ApartamentoDeleteManyArgs} args - Arguments to filter Apartamentos to delete.
     * @example
     * // Delete a few Apartamentos
     * const { count } = await prisma.apartamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApartamentoDeleteManyArgs>(args?: SelectSubset<T, ApartamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apartamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Apartamentos
     * const apartamento = await prisma.apartamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApartamentoUpdateManyArgs>(args: SelectSubset<T, ApartamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Apartamento.
     * @param {ApartamentoUpsertArgs} args - Arguments to update or create a Apartamento.
     * @example
     * // Update or create a Apartamento
     * const apartamento = await prisma.apartamento.upsert({
     *   create: {
     *     // ... data to create a Apartamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Apartamento we want to update
     *   }
     * })
     */
    upsert<T extends ApartamentoUpsertArgs>(args: SelectSubset<T, ApartamentoUpsertArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Apartamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoCountArgs} args - Arguments to filter Apartamentos to count.
     * @example
     * // Count the number of Apartamentos
     * const count = await prisma.apartamento.count({
     *   where: {
     *     // ... the filter for the Apartamentos we want to count
     *   }
     * })
    **/
    count<T extends ApartamentoCountArgs>(
      args?: Subset<T, ApartamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApartamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Apartamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApartamentoAggregateArgs>(args: Subset<T, ApartamentoAggregateArgs>): Prisma.PrismaPromise<GetApartamentoAggregateType<T>>

    /**
     * Group by Apartamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApartamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApartamentoGroupByArgs['orderBy'] }
        : { orderBy?: ApartamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApartamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApartamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Apartamento model
   */
  readonly fields: ApartamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Apartamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApartamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apartamento<T extends Apartamento$apartamentoArgs<ExtArgs> = {}>(args?: Subset<T, Apartamento$apartamentoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ApartamentoServicios<T extends Apartamento$ApartamentoServiciosArgs<ExtArgs> = {}>(args?: Subset<T, Apartamento$ApartamentoServiciosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Contratos<T extends Apartamento$ContratosArgs<ExtArgs> = {}>(args?: Subset<T, Apartamento$ContratosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Apartamento model
   */
  interface ApartamentoFieldRefs {
    readonly id: FieldRef<"Apartamento", 'String'>
    readonly numero: FieldRef<"Apartamento", 'String'>
    readonly direccion: FieldRef<"Apartamento", 'String'>
    readonly createAt: FieldRef<"Apartamento", 'DateTime'>
    readonly updateAt: FieldRef<"Apartamento", 'DateTime'>
    readonly disponible: FieldRef<"Apartamento", 'Boolean'>
    readonly activo: FieldRef<"Apartamento", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Apartamento findUnique
   */
  export type ApartamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter, which Apartamento to fetch.
     */
    where: ApartamentoWhereUniqueInput
  }

  /**
   * Apartamento findUniqueOrThrow
   */
  export type ApartamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter, which Apartamento to fetch.
     */
    where: ApartamentoWhereUniqueInput
  }

  /**
   * Apartamento findFirst
   */
  export type ApartamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter, which Apartamento to fetch.
     */
    where?: ApartamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apartamentos to fetch.
     */
    orderBy?: ApartamentoOrderByWithRelationInput | ApartamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apartamentos.
     */
    cursor?: ApartamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apartamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apartamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apartamentos.
     */
    distinct?: ApartamentoScalarFieldEnum | ApartamentoScalarFieldEnum[]
  }

  /**
   * Apartamento findFirstOrThrow
   */
  export type ApartamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter, which Apartamento to fetch.
     */
    where?: ApartamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apartamentos to fetch.
     */
    orderBy?: ApartamentoOrderByWithRelationInput | ApartamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apartamentos.
     */
    cursor?: ApartamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apartamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apartamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apartamentos.
     */
    distinct?: ApartamentoScalarFieldEnum | ApartamentoScalarFieldEnum[]
  }

  /**
   * Apartamento findMany
   */
  export type ApartamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter, which Apartamentos to fetch.
     */
    where?: ApartamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apartamentos to fetch.
     */
    orderBy?: ApartamentoOrderByWithRelationInput | ApartamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Apartamentos.
     */
    cursor?: ApartamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apartamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apartamentos.
     */
    skip?: number
    distinct?: ApartamentoScalarFieldEnum | ApartamentoScalarFieldEnum[]
  }

  /**
   * Apartamento create
   */
  export type ApartamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Apartamento.
     */
    data: XOR<ApartamentoCreateInput, ApartamentoUncheckedCreateInput>
  }

  /**
   * Apartamento createMany
   */
  export type ApartamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Apartamentos.
     */
    data: ApartamentoCreateManyInput | ApartamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Apartamento update
   */
  export type ApartamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Apartamento.
     */
    data: XOR<ApartamentoUpdateInput, ApartamentoUncheckedUpdateInput>
    /**
     * Choose, which Apartamento to update.
     */
    where: ApartamentoWhereUniqueInput
  }

  /**
   * Apartamento updateMany
   */
  export type ApartamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Apartamentos.
     */
    data: XOR<ApartamentoUpdateManyMutationInput, ApartamentoUncheckedUpdateManyInput>
    /**
     * Filter which Apartamentos to update
     */
    where?: ApartamentoWhereInput
    /**
     * Limit how many Apartamentos to update.
     */
    limit?: number
  }

  /**
   * Apartamento upsert
   */
  export type ApartamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Apartamento to update in case it exists.
     */
    where: ApartamentoWhereUniqueInput
    /**
     * In case the Apartamento found by the `where` argument doesn't exist, create a new Apartamento with this data.
     */
    create: XOR<ApartamentoCreateInput, ApartamentoUncheckedCreateInput>
    /**
     * In case the Apartamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApartamentoUpdateInput, ApartamentoUncheckedUpdateInput>
  }

  /**
   * Apartamento delete
   */
  export type ApartamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
    /**
     * Filter which Apartamento to delete.
     */
    where: ApartamentoWhereUniqueInput
  }

  /**
   * Apartamento deleteMany
   */
  export type ApartamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Apartamentos to delete
     */
    where?: ApartamentoWhereInput
    /**
     * Limit how many Apartamentos to delete.
     */
    limit?: number
  }

  /**
   * Apartamento.apartamento
   */
  export type Apartamento$apartamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    where?: HabitacionesWhereInput
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    cursor?: HabitacionesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HabitacionesScalarFieldEnum | HabitacionesScalarFieldEnum[]
  }

  /**
   * Apartamento.ApartamentoServicios
   */
  export type Apartamento$ApartamentoServiciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    where?: ApartamentoServiciosWhereInput
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    cursor?: ApartamentoServiciosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApartamentoServiciosScalarFieldEnum | ApartamentoServiciosScalarFieldEnum[]
  }

  /**
   * Apartamento.Contratos
   */
  export type Apartamento$ContratosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    where?: ContratosWhereInput
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    cursor?: ContratosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContratosScalarFieldEnum | ContratosScalarFieldEnum[]
  }

  /**
   * Apartamento without action
   */
  export type ApartamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Apartamento
     */
    select?: ApartamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Apartamento
     */
    omit?: ApartamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoInclude<ExtArgs> | null
  }


  /**
   * Model TiposHabitacion
   */

  export type AggregateTiposHabitacion = {
    _count: TiposHabitacionCountAggregateOutputType | null
    _min: TiposHabitacionMinAggregateOutputType | null
    _max: TiposHabitacionMaxAggregateOutputType | null
  }

  export type TiposHabitacionMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type TiposHabitacionMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type TiposHabitacionCountAggregateOutputType = {
    id: number
    nombre: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type TiposHabitacionMinAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type TiposHabitacionMaxAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type TiposHabitacionCountAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type TiposHabitacionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TiposHabitacion to aggregate.
     */
    where?: TiposHabitacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposHabitacions to fetch.
     */
    orderBy?: TiposHabitacionOrderByWithRelationInput | TiposHabitacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TiposHabitacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposHabitacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposHabitacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TiposHabitacions
    **/
    _count?: true | TiposHabitacionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TiposHabitacionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TiposHabitacionMaxAggregateInputType
  }

  export type GetTiposHabitacionAggregateType<T extends TiposHabitacionAggregateArgs> = {
        [P in keyof T & keyof AggregateTiposHabitacion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTiposHabitacion[P]>
      : GetScalarType<T[P], AggregateTiposHabitacion[P]>
  }




  export type TiposHabitacionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TiposHabitacionWhereInput
    orderBy?: TiposHabitacionOrderByWithAggregationInput | TiposHabitacionOrderByWithAggregationInput[]
    by: TiposHabitacionScalarFieldEnum[] | TiposHabitacionScalarFieldEnum
    having?: TiposHabitacionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TiposHabitacionCountAggregateInputType | true
    _min?: TiposHabitacionMinAggregateInputType
    _max?: TiposHabitacionMaxAggregateInputType
  }

  export type TiposHabitacionGroupByOutputType = {
    id: string
    nombre: string
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: TiposHabitacionCountAggregateOutputType | null
    _min: TiposHabitacionMinAggregateOutputType | null
    _max: TiposHabitacionMaxAggregateOutputType | null
  }

  type GetTiposHabitacionGroupByPayload<T extends TiposHabitacionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TiposHabitacionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TiposHabitacionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TiposHabitacionGroupByOutputType[P]>
            : GetScalarType<T[P], TiposHabitacionGroupByOutputType[P]>
        }
      >
    >


  export type TiposHabitacionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    apartamento?: boolean | TiposHabitacion$apartamentoArgs<ExtArgs>
    _count?: boolean | TiposHabitacionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tiposHabitacion"]>



  export type TiposHabitacionSelectScalar = {
    id?: boolean
    nombre?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type TiposHabitacionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["tiposHabitacion"]>
  export type TiposHabitacionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | TiposHabitacion$apartamentoArgs<ExtArgs>
    _count?: boolean | TiposHabitacionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TiposHabitacionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TiposHabitacion"
    objects: {
      apartamento: Prisma.$HabitacionesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["tiposHabitacion"]>
    composites: {}
  }

  type TiposHabitacionGetPayload<S extends boolean | null | undefined | TiposHabitacionDefaultArgs> = $Result.GetResult<Prisma.$TiposHabitacionPayload, S>

  type TiposHabitacionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TiposHabitacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TiposHabitacionCountAggregateInputType | true
    }

  export interface TiposHabitacionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TiposHabitacion'], meta: { name: 'TiposHabitacion' } }
    /**
     * Find zero or one TiposHabitacion that matches the filter.
     * @param {TiposHabitacionFindUniqueArgs} args - Arguments to find a TiposHabitacion
     * @example
     * // Get one TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TiposHabitacionFindUniqueArgs>(args: SelectSubset<T, TiposHabitacionFindUniqueArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TiposHabitacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TiposHabitacionFindUniqueOrThrowArgs} args - Arguments to find a TiposHabitacion
     * @example
     * // Get one TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TiposHabitacionFindUniqueOrThrowArgs>(args: SelectSubset<T, TiposHabitacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TiposHabitacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionFindFirstArgs} args - Arguments to find a TiposHabitacion
     * @example
     * // Get one TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TiposHabitacionFindFirstArgs>(args?: SelectSubset<T, TiposHabitacionFindFirstArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TiposHabitacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionFindFirstOrThrowArgs} args - Arguments to find a TiposHabitacion
     * @example
     * // Get one TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TiposHabitacionFindFirstOrThrowArgs>(args?: SelectSubset<T, TiposHabitacionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TiposHabitacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TiposHabitacions
     * const tiposHabitacions = await prisma.tiposHabitacion.findMany()
     * 
     * // Get first 10 TiposHabitacions
     * const tiposHabitacions = await prisma.tiposHabitacion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tiposHabitacionWithIdOnly = await prisma.tiposHabitacion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TiposHabitacionFindManyArgs>(args?: SelectSubset<T, TiposHabitacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TiposHabitacion.
     * @param {TiposHabitacionCreateArgs} args - Arguments to create a TiposHabitacion.
     * @example
     * // Create one TiposHabitacion
     * const TiposHabitacion = await prisma.tiposHabitacion.create({
     *   data: {
     *     // ... data to create a TiposHabitacion
     *   }
     * })
     * 
     */
    create<T extends TiposHabitacionCreateArgs>(args: SelectSubset<T, TiposHabitacionCreateArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TiposHabitacions.
     * @param {TiposHabitacionCreateManyArgs} args - Arguments to create many TiposHabitacions.
     * @example
     * // Create many TiposHabitacions
     * const tiposHabitacion = await prisma.tiposHabitacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TiposHabitacionCreateManyArgs>(args?: SelectSubset<T, TiposHabitacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TiposHabitacion.
     * @param {TiposHabitacionDeleteArgs} args - Arguments to delete one TiposHabitacion.
     * @example
     * // Delete one TiposHabitacion
     * const TiposHabitacion = await prisma.tiposHabitacion.delete({
     *   where: {
     *     // ... filter to delete one TiposHabitacion
     *   }
     * })
     * 
     */
    delete<T extends TiposHabitacionDeleteArgs>(args: SelectSubset<T, TiposHabitacionDeleteArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TiposHabitacion.
     * @param {TiposHabitacionUpdateArgs} args - Arguments to update one TiposHabitacion.
     * @example
     * // Update one TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TiposHabitacionUpdateArgs>(args: SelectSubset<T, TiposHabitacionUpdateArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TiposHabitacions.
     * @param {TiposHabitacionDeleteManyArgs} args - Arguments to filter TiposHabitacions to delete.
     * @example
     * // Delete a few TiposHabitacions
     * const { count } = await prisma.tiposHabitacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TiposHabitacionDeleteManyArgs>(args?: SelectSubset<T, TiposHabitacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TiposHabitacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TiposHabitacions
     * const tiposHabitacion = await prisma.tiposHabitacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TiposHabitacionUpdateManyArgs>(args: SelectSubset<T, TiposHabitacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TiposHabitacion.
     * @param {TiposHabitacionUpsertArgs} args - Arguments to update or create a TiposHabitacion.
     * @example
     * // Update or create a TiposHabitacion
     * const tiposHabitacion = await prisma.tiposHabitacion.upsert({
     *   create: {
     *     // ... data to create a TiposHabitacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TiposHabitacion we want to update
     *   }
     * })
     */
    upsert<T extends TiposHabitacionUpsertArgs>(args: SelectSubset<T, TiposHabitacionUpsertArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TiposHabitacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionCountArgs} args - Arguments to filter TiposHabitacions to count.
     * @example
     * // Count the number of TiposHabitacions
     * const count = await prisma.tiposHabitacion.count({
     *   where: {
     *     // ... the filter for the TiposHabitacions we want to count
     *   }
     * })
    **/
    count<T extends TiposHabitacionCountArgs>(
      args?: Subset<T, TiposHabitacionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TiposHabitacionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TiposHabitacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TiposHabitacionAggregateArgs>(args: Subset<T, TiposHabitacionAggregateArgs>): Prisma.PrismaPromise<GetTiposHabitacionAggregateType<T>>

    /**
     * Group by TiposHabitacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposHabitacionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TiposHabitacionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TiposHabitacionGroupByArgs['orderBy'] }
        : { orderBy?: TiposHabitacionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TiposHabitacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTiposHabitacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TiposHabitacion model
   */
  readonly fields: TiposHabitacionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TiposHabitacion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TiposHabitacionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apartamento<T extends TiposHabitacion$apartamentoArgs<ExtArgs> = {}>(args?: Subset<T, TiposHabitacion$apartamentoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TiposHabitacion model
   */
  interface TiposHabitacionFieldRefs {
    readonly id: FieldRef<"TiposHabitacion", 'String'>
    readonly nombre: FieldRef<"TiposHabitacion", 'String'>
    readonly createAt: FieldRef<"TiposHabitacion", 'DateTime'>
    readonly updateAt: FieldRef<"TiposHabitacion", 'DateTime'>
    readonly activo: FieldRef<"TiposHabitacion", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TiposHabitacion findUnique
   */
  export type TiposHabitacionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter, which TiposHabitacion to fetch.
     */
    where: TiposHabitacionWhereUniqueInput
  }

  /**
   * TiposHabitacion findUniqueOrThrow
   */
  export type TiposHabitacionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter, which TiposHabitacion to fetch.
     */
    where: TiposHabitacionWhereUniqueInput
  }

  /**
   * TiposHabitacion findFirst
   */
  export type TiposHabitacionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter, which TiposHabitacion to fetch.
     */
    where?: TiposHabitacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposHabitacions to fetch.
     */
    orderBy?: TiposHabitacionOrderByWithRelationInput | TiposHabitacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TiposHabitacions.
     */
    cursor?: TiposHabitacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposHabitacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposHabitacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TiposHabitacions.
     */
    distinct?: TiposHabitacionScalarFieldEnum | TiposHabitacionScalarFieldEnum[]
  }

  /**
   * TiposHabitacion findFirstOrThrow
   */
  export type TiposHabitacionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter, which TiposHabitacion to fetch.
     */
    where?: TiposHabitacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposHabitacions to fetch.
     */
    orderBy?: TiposHabitacionOrderByWithRelationInput | TiposHabitacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TiposHabitacions.
     */
    cursor?: TiposHabitacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposHabitacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposHabitacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TiposHabitacions.
     */
    distinct?: TiposHabitacionScalarFieldEnum | TiposHabitacionScalarFieldEnum[]
  }

  /**
   * TiposHabitacion findMany
   */
  export type TiposHabitacionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter, which TiposHabitacions to fetch.
     */
    where?: TiposHabitacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposHabitacions to fetch.
     */
    orderBy?: TiposHabitacionOrderByWithRelationInput | TiposHabitacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TiposHabitacions.
     */
    cursor?: TiposHabitacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposHabitacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposHabitacions.
     */
    skip?: number
    distinct?: TiposHabitacionScalarFieldEnum | TiposHabitacionScalarFieldEnum[]
  }

  /**
   * TiposHabitacion create
   */
  export type TiposHabitacionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * The data needed to create a TiposHabitacion.
     */
    data: XOR<TiposHabitacionCreateInput, TiposHabitacionUncheckedCreateInput>
  }

  /**
   * TiposHabitacion createMany
   */
  export type TiposHabitacionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TiposHabitacions.
     */
    data: TiposHabitacionCreateManyInput | TiposHabitacionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TiposHabitacion update
   */
  export type TiposHabitacionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * The data needed to update a TiposHabitacion.
     */
    data: XOR<TiposHabitacionUpdateInput, TiposHabitacionUncheckedUpdateInput>
    /**
     * Choose, which TiposHabitacion to update.
     */
    where: TiposHabitacionWhereUniqueInput
  }

  /**
   * TiposHabitacion updateMany
   */
  export type TiposHabitacionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TiposHabitacions.
     */
    data: XOR<TiposHabitacionUpdateManyMutationInput, TiposHabitacionUncheckedUpdateManyInput>
    /**
     * Filter which TiposHabitacions to update
     */
    where?: TiposHabitacionWhereInput
    /**
     * Limit how many TiposHabitacions to update.
     */
    limit?: number
  }

  /**
   * TiposHabitacion upsert
   */
  export type TiposHabitacionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * The filter to search for the TiposHabitacion to update in case it exists.
     */
    where: TiposHabitacionWhereUniqueInput
    /**
     * In case the TiposHabitacion found by the `where` argument doesn't exist, create a new TiposHabitacion with this data.
     */
    create: XOR<TiposHabitacionCreateInput, TiposHabitacionUncheckedCreateInput>
    /**
     * In case the TiposHabitacion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TiposHabitacionUpdateInput, TiposHabitacionUncheckedUpdateInput>
  }

  /**
   * TiposHabitacion delete
   */
  export type TiposHabitacionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
    /**
     * Filter which TiposHabitacion to delete.
     */
    where: TiposHabitacionWhereUniqueInput
  }

  /**
   * TiposHabitacion deleteMany
   */
  export type TiposHabitacionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TiposHabitacions to delete
     */
    where?: TiposHabitacionWhereInput
    /**
     * Limit how many TiposHabitacions to delete.
     */
    limit?: number
  }

  /**
   * TiposHabitacion.apartamento
   */
  export type TiposHabitacion$apartamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    where?: HabitacionesWhereInput
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    cursor?: HabitacionesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HabitacionesScalarFieldEnum | HabitacionesScalarFieldEnum[]
  }

  /**
   * TiposHabitacion without action
   */
  export type TiposHabitacionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposHabitacion
     */
    select?: TiposHabitacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposHabitacion
     */
    omit?: TiposHabitacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposHabitacionInclude<ExtArgs> | null
  }


  /**
   * Model Habitaciones
   */

  export type AggregateHabitaciones = {
    _count: HabitacionesCountAggregateOutputType | null
    _avg: HabitacionesAvgAggregateOutputType | null
    _sum: HabitacionesSumAggregateOutputType | null
    _min: HabitacionesMinAggregateOutputType | null
    _max: HabitacionesMaxAggregateOutputType | null
  }

  export type HabitacionesAvgAggregateOutputType = {
    cantidad: number | null
  }

  export type HabitacionesSumAggregateOutputType = {
    cantidad: number | null
  }

  export type HabitacionesMinAggregateOutputType = {
    id: string | null
    apartamentoId: string | null
    tipoHabitacionId: string | null
    cantidad: number | null
    createAt: Date | null
    activo: boolean | null
    updateAt: Date | null
  }

  export type HabitacionesMaxAggregateOutputType = {
    id: string | null
    apartamentoId: string | null
    tipoHabitacionId: string | null
    cantidad: number | null
    createAt: Date | null
    activo: boolean | null
    updateAt: Date | null
  }

  export type HabitacionesCountAggregateOutputType = {
    id: number
    apartamentoId: number
    tipoHabitacionId: number
    cantidad: number
    createAt: number
    activo: number
    updateAt: number
    _all: number
  }


  export type HabitacionesAvgAggregateInputType = {
    cantidad?: true
  }

  export type HabitacionesSumAggregateInputType = {
    cantidad?: true
  }

  export type HabitacionesMinAggregateInputType = {
    id?: true
    apartamentoId?: true
    tipoHabitacionId?: true
    cantidad?: true
    createAt?: true
    activo?: true
    updateAt?: true
  }

  export type HabitacionesMaxAggregateInputType = {
    id?: true
    apartamentoId?: true
    tipoHabitacionId?: true
    cantidad?: true
    createAt?: true
    activo?: true
    updateAt?: true
  }

  export type HabitacionesCountAggregateInputType = {
    id?: true
    apartamentoId?: true
    tipoHabitacionId?: true
    cantidad?: true
    createAt?: true
    activo?: true
    updateAt?: true
    _all?: true
  }

  export type HabitacionesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Habitaciones to aggregate.
     */
    where?: HabitacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Habitaciones to fetch.
     */
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HabitacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Habitaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Habitaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Habitaciones
    **/
    _count?: true | HabitacionesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HabitacionesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HabitacionesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HabitacionesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HabitacionesMaxAggregateInputType
  }

  export type GetHabitacionesAggregateType<T extends HabitacionesAggregateArgs> = {
        [P in keyof T & keyof AggregateHabitaciones]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHabitaciones[P]>
      : GetScalarType<T[P], AggregateHabitaciones[P]>
  }




  export type HabitacionesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HabitacionesWhereInput
    orderBy?: HabitacionesOrderByWithAggregationInput | HabitacionesOrderByWithAggregationInput[]
    by: HabitacionesScalarFieldEnum[] | HabitacionesScalarFieldEnum
    having?: HabitacionesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HabitacionesCountAggregateInputType | true
    _avg?: HabitacionesAvgAggregateInputType
    _sum?: HabitacionesSumAggregateInputType
    _min?: HabitacionesMinAggregateInputType
    _max?: HabitacionesMaxAggregateInputType
  }

  export type HabitacionesGroupByOutputType = {
    id: string
    apartamentoId: string
    tipoHabitacionId: string
    cantidad: number
    createAt: Date
    activo: boolean
    updateAt: Date
    _count: HabitacionesCountAggregateOutputType | null
    _avg: HabitacionesAvgAggregateOutputType | null
    _sum: HabitacionesSumAggregateOutputType | null
    _min: HabitacionesMinAggregateOutputType | null
    _max: HabitacionesMaxAggregateOutputType | null
  }

  type GetHabitacionesGroupByPayload<T extends HabitacionesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HabitacionesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HabitacionesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HabitacionesGroupByOutputType[P]>
            : GetScalarType<T[P], HabitacionesGroupByOutputType[P]>
        }
      >
    >


  export type HabitacionesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    apartamentoId?: boolean
    tipoHabitacionId?: boolean
    cantidad?: boolean
    createAt?: boolean
    activo?: boolean
    updateAt?: boolean
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    tipoHabitacion?: boolean | TiposHabitacionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["habitaciones"]>



  export type HabitacionesSelectScalar = {
    id?: boolean
    apartamentoId?: boolean
    tipoHabitacionId?: boolean
    cantidad?: boolean
    createAt?: boolean
    activo?: boolean
    updateAt?: boolean
  }

  export type HabitacionesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "apartamentoId" | "tipoHabitacionId" | "cantidad" | "createAt" | "activo" | "updateAt", ExtArgs["result"]["habitaciones"]>
  export type HabitacionesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    tipoHabitacion?: boolean | TiposHabitacionDefaultArgs<ExtArgs>
  }

  export type $HabitacionesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Habitaciones"
    objects: {
      apartamento: Prisma.$ApartamentoPayload<ExtArgs>
      tipoHabitacion: Prisma.$TiposHabitacionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      apartamentoId: string
      tipoHabitacionId: string
      cantidad: number
      createAt: Date
      activo: boolean
      updateAt: Date
    }, ExtArgs["result"]["habitaciones"]>
    composites: {}
  }

  type HabitacionesGetPayload<S extends boolean | null | undefined | HabitacionesDefaultArgs> = $Result.GetResult<Prisma.$HabitacionesPayload, S>

  type HabitacionesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HabitacionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HabitacionesCountAggregateInputType | true
    }

  export interface HabitacionesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Habitaciones'], meta: { name: 'Habitaciones' } }
    /**
     * Find zero or one Habitaciones that matches the filter.
     * @param {HabitacionesFindUniqueArgs} args - Arguments to find a Habitaciones
     * @example
     * // Get one Habitaciones
     * const habitaciones = await prisma.habitaciones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HabitacionesFindUniqueArgs>(args: SelectSubset<T, HabitacionesFindUniqueArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Habitaciones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HabitacionesFindUniqueOrThrowArgs} args - Arguments to find a Habitaciones
     * @example
     * // Get one Habitaciones
     * const habitaciones = await prisma.habitaciones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HabitacionesFindUniqueOrThrowArgs>(args: SelectSubset<T, HabitacionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Habitaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesFindFirstArgs} args - Arguments to find a Habitaciones
     * @example
     * // Get one Habitaciones
     * const habitaciones = await prisma.habitaciones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HabitacionesFindFirstArgs>(args?: SelectSubset<T, HabitacionesFindFirstArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Habitaciones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesFindFirstOrThrowArgs} args - Arguments to find a Habitaciones
     * @example
     * // Get one Habitaciones
     * const habitaciones = await prisma.habitaciones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HabitacionesFindFirstOrThrowArgs>(args?: SelectSubset<T, HabitacionesFindFirstOrThrowArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Habitaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Habitaciones
     * const habitaciones = await prisma.habitaciones.findMany()
     * 
     * // Get first 10 Habitaciones
     * const habitaciones = await prisma.habitaciones.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const habitacionesWithIdOnly = await prisma.habitaciones.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HabitacionesFindManyArgs>(args?: SelectSubset<T, HabitacionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Habitaciones.
     * @param {HabitacionesCreateArgs} args - Arguments to create a Habitaciones.
     * @example
     * // Create one Habitaciones
     * const Habitaciones = await prisma.habitaciones.create({
     *   data: {
     *     // ... data to create a Habitaciones
     *   }
     * })
     * 
     */
    create<T extends HabitacionesCreateArgs>(args: SelectSubset<T, HabitacionesCreateArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Habitaciones.
     * @param {HabitacionesCreateManyArgs} args - Arguments to create many Habitaciones.
     * @example
     * // Create many Habitaciones
     * const habitaciones = await prisma.habitaciones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HabitacionesCreateManyArgs>(args?: SelectSubset<T, HabitacionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Habitaciones.
     * @param {HabitacionesDeleteArgs} args - Arguments to delete one Habitaciones.
     * @example
     * // Delete one Habitaciones
     * const Habitaciones = await prisma.habitaciones.delete({
     *   where: {
     *     // ... filter to delete one Habitaciones
     *   }
     * })
     * 
     */
    delete<T extends HabitacionesDeleteArgs>(args: SelectSubset<T, HabitacionesDeleteArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Habitaciones.
     * @param {HabitacionesUpdateArgs} args - Arguments to update one Habitaciones.
     * @example
     * // Update one Habitaciones
     * const habitaciones = await prisma.habitaciones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HabitacionesUpdateArgs>(args: SelectSubset<T, HabitacionesUpdateArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Habitaciones.
     * @param {HabitacionesDeleteManyArgs} args - Arguments to filter Habitaciones to delete.
     * @example
     * // Delete a few Habitaciones
     * const { count } = await prisma.habitaciones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HabitacionesDeleteManyArgs>(args?: SelectSubset<T, HabitacionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Habitaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Habitaciones
     * const habitaciones = await prisma.habitaciones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HabitacionesUpdateManyArgs>(args: SelectSubset<T, HabitacionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Habitaciones.
     * @param {HabitacionesUpsertArgs} args - Arguments to update or create a Habitaciones.
     * @example
     * // Update or create a Habitaciones
     * const habitaciones = await prisma.habitaciones.upsert({
     *   create: {
     *     // ... data to create a Habitaciones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Habitaciones we want to update
     *   }
     * })
     */
    upsert<T extends HabitacionesUpsertArgs>(args: SelectSubset<T, HabitacionesUpsertArgs<ExtArgs>>): Prisma__HabitacionesClient<$Result.GetResult<Prisma.$HabitacionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Habitaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesCountArgs} args - Arguments to filter Habitaciones to count.
     * @example
     * // Count the number of Habitaciones
     * const count = await prisma.habitaciones.count({
     *   where: {
     *     // ... the filter for the Habitaciones we want to count
     *   }
     * })
    **/
    count<T extends HabitacionesCountArgs>(
      args?: Subset<T, HabitacionesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HabitacionesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Habitaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HabitacionesAggregateArgs>(args: Subset<T, HabitacionesAggregateArgs>): Prisma.PrismaPromise<GetHabitacionesAggregateType<T>>

    /**
     * Group by Habitaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitacionesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HabitacionesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HabitacionesGroupByArgs['orderBy'] }
        : { orderBy?: HabitacionesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HabitacionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHabitacionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Habitaciones model
   */
  readonly fields: HabitacionesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Habitaciones.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HabitacionesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apartamento<T extends ApartamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApartamentoDefaultArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tipoHabitacion<T extends TiposHabitacionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TiposHabitacionDefaultArgs<ExtArgs>>): Prisma__TiposHabitacionClient<$Result.GetResult<Prisma.$TiposHabitacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Habitaciones model
   */
  interface HabitacionesFieldRefs {
    readonly id: FieldRef<"Habitaciones", 'String'>
    readonly apartamentoId: FieldRef<"Habitaciones", 'String'>
    readonly tipoHabitacionId: FieldRef<"Habitaciones", 'String'>
    readonly cantidad: FieldRef<"Habitaciones", 'Int'>
    readonly createAt: FieldRef<"Habitaciones", 'DateTime'>
    readonly activo: FieldRef<"Habitaciones", 'Boolean'>
    readonly updateAt: FieldRef<"Habitaciones", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Habitaciones findUnique
   */
  export type HabitacionesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter, which Habitaciones to fetch.
     */
    where: HabitacionesWhereUniqueInput
  }

  /**
   * Habitaciones findUniqueOrThrow
   */
  export type HabitacionesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter, which Habitaciones to fetch.
     */
    where: HabitacionesWhereUniqueInput
  }

  /**
   * Habitaciones findFirst
   */
  export type HabitacionesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter, which Habitaciones to fetch.
     */
    where?: HabitacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Habitaciones to fetch.
     */
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Habitaciones.
     */
    cursor?: HabitacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Habitaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Habitaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Habitaciones.
     */
    distinct?: HabitacionesScalarFieldEnum | HabitacionesScalarFieldEnum[]
  }

  /**
   * Habitaciones findFirstOrThrow
   */
  export type HabitacionesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter, which Habitaciones to fetch.
     */
    where?: HabitacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Habitaciones to fetch.
     */
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Habitaciones.
     */
    cursor?: HabitacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Habitaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Habitaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Habitaciones.
     */
    distinct?: HabitacionesScalarFieldEnum | HabitacionesScalarFieldEnum[]
  }

  /**
   * Habitaciones findMany
   */
  export type HabitacionesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter, which Habitaciones to fetch.
     */
    where?: HabitacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Habitaciones to fetch.
     */
    orderBy?: HabitacionesOrderByWithRelationInput | HabitacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Habitaciones.
     */
    cursor?: HabitacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Habitaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Habitaciones.
     */
    skip?: number
    distinct?: HabitacionesScalarFieldEnum | HabitacionesScalarFieldEnum[]
  }

  /**
   * Habitaciones create
   */
  export type HabitacionesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * The data needed to create a Habitaciones.
     */
    data: XOR<HabitacionesCreateInput, HabitacionesUncheckedCreateInput>
  }

  /**
   * Habitaciones createMany
   */
  export type HabitacionesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Habitaciones.
     */
    data: HabitacionesCreateManyInput | HabitacionesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Habitaciones update
   */
  export type HabitacionesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * The data needed to update a Habitaciones.
     */
    data: XOR<HabitacionesUpdateInput, HabitacionesUncheckedUpdateInput>
    /**
     * Choose, which Habitaciones to update.
     */
    where: HabitacionesWhereUniqueInput
  }

  /**
   * Habitaciones updateMany
   */
  export type HabitacionesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Habitaciones.
     */
    data: XOR<HabitacionesUpdateManyMutationInput, HabitacionesUncheckedUpdateManyInput>
    /**
     * Filter which Habitaciones to update
     */
    where?: HabitacionesWhereInput
    /**
     * Limit how many Habitaciones to update.
     */
    limit?: number
  }

  /**
   * Habitaciones upsert
   */
  export type HabitacionesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * The filter to search for the Habitaciones to update in case it exists.
     */
    where: HabitacionesWhereUniqueInput
    /**
     * In case the Habitaciones found by the `where` argument doesn't exist, create a new Habitaciones with this data.
     */
    create: XOR<HabitacionesCreateInput, HabitacionesUncheckedCreateInput>
    /**
     * In case the Habitaciones was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HabitacionesUpdateInput, HabitacionesUncheckedUpdateInput>
  }

  /**
   * Habitaciones delete
   */
  export type HabitacionesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
    /**
     * Filter which Habitaciones to delete.
     */
    where: HabitacionesWhereUniqueInput
  }

  /**
   * Habitaciones deleteMany
   */
  export type HabitacionesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Habitaciones to delete
     */
    where?: HabitacionesWhereInput
    /**
     * Limit how many Habitaciones to delete.
     */
    limit?: number
  }

  /**
   * Habitaciones without action
   */
  export type HabitacionesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Habitaciones
     */
    select?: HabitacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Habitaciones
     */
    omit?: HabitacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitacionesInclude<ExtArgs> | null
  }


  /**
   * Model Servicios
   */

  export type AggregateServicios = {
    _count: ServiciosCountAggregateOutputType | null
    _min: ServiciosMinAggregateOutputType | null
    _max: ServiciosMaxAggregateOutputType | null
  }

  export type ServiciosMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type ServiciosMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type ServiciosCountAggregateOutputType = {
    id: number
    nombre: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type ServiciosMinAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type ServiciosMaxAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type ServiciosCountAggregateInputType = {
    id?: true
    nombre?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type ServiciosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servicios to aggregate.
     */
    where?: ServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicios to fetch.
     */
    orderBy?: ServiciosOrderByWithRelationInput | ServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servicios
    **/
    _count?: true | ServiciosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiciosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiciosMaxAggregateInputType
  }

  export type GetServiciosAggregateType<T extends ServiciosAggregateArgs> = {
        [P in keyof T & keyof AggregateServicios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServicios[P]>
      : GetScalarType<T[P], AggregateServicios[P]>
  }




  export type ServiciosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiciosWhereInput
    orderBy?: ServiciosOrderByWithAggregationInput | ServiciosOrderByWithAggregationInput[]
    by: ServiciosScalarFieldEnum[] | ServiciosScalarFieldEnum
    having?: ServiciosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiciosCountAggregateInputType | true
    _min?: ServiciosMinAggregateInputType
    _max?: ServiciosMaxAggregateInputType
  }

  export type ServiciosGroupByOutputType = {
    id: string
    nombre: string
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: ServiciosCountAggregateOutputType | null
    _min: ServiciosMinAggregateOutputType | null
    _max: ServiciosMaxAggregateOutputType | null
  }

  type GetServiciosGroupByPayload<T extends ServiciosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiciosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiciosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiciosGroupByOutputType[P]>
            : GetScalarType<T[P], ServiciosGroupByOutputType[P]>
        }
      >
    >


  export type ServiciosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    ApartamentoServicios?: boolean | Servicios$ApartamentoServiciosArgs<ExtArgs>
    _count?: boolean | ServiciosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicios"]>



  export type ServiciosSelectScalar = {
    id?: boolean
    nombre?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type ServiciosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["servicios"]>
  export type ServiciosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ApartamentoServicios?: boolean | Servicios$ApartamentoServiciosArgs<ExtArgs>
    _count?: boolean | ServiciosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ServiciosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Servicios"
    objects: {
      ApartamentoServicios: Prisma.$ApartamentoServiciosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["servicios"]>
    composites: {}
  }

  type ServiciosGetPayload<S extends boolean | null | undefined | ServiciosDefaultArgs> = $Result.GetResult<Prisma.$ServiciosPayload, S>

  type ServiciosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiciosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiciosCountAggregateInputType | true
    }

  export interface ServiciosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Servicios'], meta: { name: 'Servicios' } }
    /**
     * Find zero or one Servicios that matches the filter.
     * @param {ServiciosFindUniqueArgs} args - Arguments to find a Servicios
     * @example
     * // Get one Servicios
     * const servicios = await prisma.servicios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiciosFindUniqueArgs>(args: SelectSubset<T, ServiciosFindUniqueArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Servicios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiciosFindUniqueOrThrowArgs} args - Arguments to find a Servicios
     * @example
     * // Get one Servicios
     * const servicios = await prisma.servicios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiciosFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiciosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servicios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosFindFirstArgs} args - Arguments to find a Servicios
     * @example
     * // Get one Servicios
     * const servicios = await prisma.servicios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiciosFindFirstArgs>(args?: SelectSubset<T, ServiciosFindFirstArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servicios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosFindFirstOrThrowArgs} args - Arguments to find a Servicios
     * @example
     * // Get one Servicios
     * const servicios = await prisma.servicios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiciosFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiciosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servicios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servicios
     * const servicios = await prisma.servicios.findMany()
     * 
     * // Get first 10 Servicios
     * const servicios = await prisma.servicios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviciosWithIdOnly = await prisma.servicios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiciosFindManyArgs>(args?: SelectSubset<T, ServiciosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Servicios.
     * @param {ServiciosCreateArgs} args - Arguments to create a Servicios.
     * @example
     * // Create one Servicios
     * const Servicios = await prisma.servicios.create({
     *   data: {
     *     // ... data to create a Servicios
     *   }
     * })
     * 
     */
    create<T extends ServiciosCreateArgs>(args: SelectSubset<T, ServiciosCreateArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servicios.
     * @param {ServiciosCreateManyArgs} args - Arguments to create many Servicios.
     * @example
     * // Create many Servicios
     * const servicios = await prisma.servicios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiciosCreateManyArgs>(args?: SelectSubset<T, ServiciosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Servicios.
     * @param {ServiciosDeleteArgs} args - Arguments to delete one Servicios.
     * @example
     * // Delete one Servicios
     * const Servicios = await prisma.servicios.delete({
     *   where: {
     *     // ... filter to delete one Servicios
     *   }
     * })
     * 
     */
    delete<T extends ServiciosDeleteArgs>(args: SelectSubset<T, ServiciosDeleteArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Servicios.
     * @param {ServiciosUpdateArgs} args - Arguments to update one Servicios.
     * @example
     * // Update one Servicios
     * const servicios = await prisma.servicios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiciosUpdateArgs>(args: SelectSubset<T, ServiciosUpdateArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servicios.
     * @param {ServiciosDeleteManyArgs} args - Arguments to filter Servicios to delete.
     * @example
     * // Delete a few Servicios
     * const { count } = await prisma.servicios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiciosDeleteManyArgs>(args?: SelectSubset<T, ServiciosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servicios
     * const servicios = await prisma.servicios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiciosUpdateManyArgs>(args: SelectSubset<T, ServiciosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Servicios.
     * @param {ServiciosUpsertArgs} args - Arguments to update or create a Servicios.
     * @example
     * // Update or create a Servicios
     * const servicios = await prisma.servicios.upsert({
     *   create: {
     *     // ... data to create a Servicios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Servicios we want to update
     *   }
     * })
     */
    upsert<T extends ServiciosUpsertArgs>(args: SelectSubset<T, ServiciosUpsertArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosCountArgs} args - Arguments to filter Servicios to count.
     * @example
     * // Count the number of Servicios
     * const count = await prisma.servicios.count({
     *   where: {
     *     // ... the filter for the Servicios we want to count
     *   }
     * })
    **/
    count<T extends ServiciosCountArgs>(
      args?: Subset<T, ServiciosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiciosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Servicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiciosAggregateArgs>(args: Subset<T, ServiciosAggregateArgs>): Prisma.PrismaPromise<GetServiciosAggregateType<T>>

    /**
     * Group by Servicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiciosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiciosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiciosGroupByArgs['orderBy'] }
        : { orderBy?: ServiciosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiciosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiciosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Servicios model
   */
  readonly fields: ServiciosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Servicios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiciosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ApartamentoServicios<T extends Servicios$ApartamentoServiciosArgs<ExtArgs> = {}>(args?: Subset<T, Servicios$ApartamentoServiciosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Servicios model
   */
  interface ServiciosFieldRefs {
    readonly id: FieldRef<"Servicios", 'String'>
    readonly nombre: FieldRef<"Servicios", 'String'>
    readonly createAt: FieldRef<"Servicios", 'DateTime'>
    readonly updateAt: FieldRef<"Servicios", 'DateTime'>
    readonly activo: FieldRef<"Servicios", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Servicios findUnique
   */
  export type ServiciosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter, which Servicios to fetch.
     */
    where: ServiciosWhereUniqueInput
  }

  /**
   * Servicios findUniqueOrThrow
   */
  export type ServiciosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter, which Servicios to fetch.
     */
    where: ServiciosWhereUniqueInput
  }

  /**
   * Servicios findFirst
   */
  export type ServiciosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter, which Servicios to fetch.
     */
    where?: ServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicios to fetch.
     */
    orderBy?: ServiciosOrderByWithRelationInput | ServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servicios.
     */
    cursor?: ServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicios.
     */
    distinct?: ServiciosScalarFieldEnum | ServiciosScalarFieldEnum[]
  }

  /**
   * Servicios findFirstOrThrow
   */
  export type ServiciosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter, which Servicios to fetch.
     */
    where?: ServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicios to fetch.
     */
    orderBy?: ServiciosOrderByWithRelationInput | ServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servicios.
     */
    cursor?: ServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicios.
     */
    distinct?: ServiciosScalarFieldEnum | ServiciosScalarFieldEnum[]
  }

  /**
   * Servicios findMany
   */
  export type ServiciosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter, which Servicios to fetch.
     */
    where?: ServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicios to fetch.
     */
    orderBy?: ServiciosOrderByWithRelationInput | ServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servicios.
     */
    cursor?: ServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicios.
     */
    skip?: number
    distinct?: ServiciosScalarFieldEnum | ServiciosScalarFieldEnum[]
  }

  /**
   * Servicios create
   */
  export type ServiciosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * The data needed to create a Servicios.
     */
    data: XOR<ServiciosCreateInput, ServiciosUncheckedCreateInput>
  }

  /**
   * Servicios createMany
   */
  export type ServiciosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Servicios.
     */
    data: ServiciosCreateManyInput | ServiciosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Servicios update
   */
  export type ServiciosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * The data needed to update a Servicios.
     */
    data: XOR<ServiciosUpdateInput, ServiciosUncheckedUpdateInput>
    /**
     * Choose, which Servicios to update.
     */
    where: ServiciosWhereUniqueInput
  }

  /**
   * Servicios updateMany
   */
  export type ServiciosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Servicios.
     */
    data: XOR<ServiciosUpdateManyMutationInput, ServiciosUncheckedUpdateManyInput>
    /**
     * Filter which Servicios to update
     */
    where?: ServiciosWhereInput
    /**
     * Limit how many Servicios to update.
     */
    limit?: number
  }

  /**
   * Servicios upsert
   */
  export type ServiciosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * The filter to search for the Servicios to update in case it exists.
     */
    where: ServiciosWhereUniqueInput
    /**
     * In case the Servicios found by the `where` argument doesn't exist, create a new Servicios with this data.
     */
    create: XOR<ServiciosCreateInput, ServiciosUncheckedCreateInput>
    /**
     * In case the Servicios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiciosUpdateInput, ServiciosUncheckedUpdateInput>
  }

  /**
   * Servicios delete
   */
  export type ServiciosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
    /**
     * Filter which Servicios to delete.
     */
    where: ServiciosWhereUniqueInput
  }

  /**
   * Servicios deleteMany
   */
  export type ServiciosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servicios to delete
     */
    where?: ServiciosWhereInput
    /**
     * Limit how many Servicios to delete.
     */
    limit?: number
  }

  /**
   * Servicios.ApartamentoServicios
   */
  export type Servicios$ApartamentoServiciosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    where?: ApartamentoServiciosWhereInput
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    cursor?: ApartamentoServiciosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApartamentoServiciosScalarFieldEnum | ApartamentoServiciosScalarFieldEnum[]
  }

  /**
   * Servicios without action
   */
  export type ServiciosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Servicios
     */
    select?: ServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Servicios
     */
    omit?: ServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiciosInclude<ExtArgs> | null
  }


  /**
   * Model ApartamentoServicios
   */

  export type AggregateApartamentoServicios = {
    _count: ApartamentoServiciosCountAggregateOutputType | null
    _avg: ApartamentoServiciosAvgAggregateOutputType | null
    _sum: ApartamentoServiciosSumAggregateOutputType | null
    _min: ApartamentoServiciosMinAggregateOutputType | null
    _max: ApartamentoServiciosMaxAggregateOutputType | null
  }

  export type ApartamentoServiciosAvgAggregateOutputType = {
    costoAdicional: Decimal | null
  }

  export type ApartamentoServiciosSumAggregateOutputType = {
    costoAdicional: Decimal | null
  }

  export type ApartamentoServiciosMinAggregateOutputType = {
    id: string | null
    apartamentoId: string | null
    servicioId: string | null
    incluido: boolean | null
    costoAdicional: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ApartamentoServiciosMaxAggregateOutputType = {
    id: string | null
    apartamentoId: string | null
    servicioId: string | null
    incluido: boolean | null
    costoAdicional: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ApartamentoServiciosCountAggregateOutputType = {
    id: number
    apartamentoId: number
    servicioId: number
    incluido: number
    costoAdicional: number
    createAt: number
    updateAt: number
    _all: number
  }


  export type ApartamentoServiciosAvgAggregateInputType = {
    costoAdicional?: true
  }

  export type ApartamentoServiciosSumAggregateInputType = {
    costoAdicional?: true
  }

  export type ApartamentoServiciosMinAggregateInputType = {
    id?: true
    apartamentoId?: true
    servicioId?: true
    incluido?: true
    costoAdicional?: true
    createAt?: true
    updateAt?: true
  }

  export type ApartamentoServiciosMaxAggregateInputType = {
    id?: true
    apartamentoId?: true
    servicioId?: true
    incluido?: true
    costoAdicional?: true
    createAt?: true
    updateAt?: true
  }

  export type ApartamentoServiciosCountAggregateInputType = {
    id?: true
    apartamentoId?: true
    servicioId?: true
    incluido?: true
    costoAdicional?: true
    createAt?: true
    updateAt?: true
    _all?: true
  }

  export type ApartamentoServiciosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApartamentoServicios to aggregate.
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApartamentoServicios to fetch.
     */
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApartamentoServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApartamentoServicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApartamentoServicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApartamentoServicios
    **/
    _count?: true | ApartamentoServiciosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApartamentoServiciosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApartamentoServiciosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApartamentoServiciosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApartamentoServiciosMaxAggregateInputType
  }

  export type GetApartamentoServiciosAggregateType<T extends ApartamentoServiciosAggregateArgs> = {
        [P in keyof T & keyof AggregateApartamentoServicios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApartamentoServicios[P]>
      : GetScalarType<T[P], AggregateApartamentoServicios[P]>
  }




  export type ApartamentoServiciosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApartamentoServiciosWhereInput
    orderBy?: ApartamentoServiciosOrderByWithAggregationInput | ApartamentoServiciosOrderByWithAggregationInput[]
    by: ApartamentoServiciosScalarFieldEnum[] | ApartamentoServiciosScalarFieldEnum
    having?: ApartamentoServiciosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApartamentoServiciosCountAggregateInputType | true
    _avg?: ApartamentoServiciosAvgAggregateInputType
    _sum?: ApartamentoServiciosSumAggregateInputType
    _min?: ApartamentoServiciosMinAggregateInputType
    _max?: ApartamentoServiciosMaxAggregateInputType
  }

  export type ApartamentoServiciosGroupByOutputType = {
    id: string
    apartamentoId: string
    servicioId: string
    incluido: boolean
    costoAdicional: Decimal
    createAt: Date
    updateAt: Date
    _count: ApartamentoServiciosCountAggregateOutputType | null
    _avg: ApartamentoServiciosAvgAggregateOutputType | null
    _sum: ApartamentoServiciosSumAggregateOutputType | null
    _min: ApartamentoServiciosMinAggregateOutputType | null
    _max: ApartamentoServiciosMaxAggregateOutputType | null
  }

  type GetApartamentoServiciosGroupByPayload<T extends ApartamentoServiciosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApartamentoServiciosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApartamentoServiciosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApartamentoServiciosGroupByOutputType[P]>
            : GetScalarType<T[P], ApartamentoServiciosGroupByOutputType[P]>
        }
      >
    >


  export type ApartamentoServiciosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    apartamentoId?: boolean
    servicioId?: boolean
    incluido?: boolean
    costoAdicional?: boolean
    createAt?: boolean
    updateAt?: boolean
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    servicio?: boolean | ServiciosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apartamentoServicios"]>



  export type ApartamentoServiciosSelectScalar = {
    id?: boolean
    apartamentoId?: boolean
    servicioId?: boolean
    incluido?: boolean
    costoAdicional?: boolean
    createAt?: boolean
    updateAt?: boolean
  }

  export type ApartamentoServiciosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "apartamentoId" | "servicioId" | "incluido" | "costoAdicional" | "createAt" | "updateAt", ExtArgs["result"]["apartamentoServicios"]>
  export type ApartamentoServiciosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    servicio?: boolean | ServiciosDefaultArgs<ExtArgs>
  }

  export type $ApartamentoServiciosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApartamentoServicios"
    objects: {
      apartamento: Prisma.$ApartamentoPayload<ExtArgs>
      servicio: Prisma.$ServiciosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      apartamentoId: string
      servicioId: string
      incluido: boolean
      costoAdicional: Prisma.Decimal
      createAt: Date
      updateAt: Date
    }, ExtArgs["result"]["apartamentoServicios"]>
    composites: {}
  }

  type ApartamentoServiciosGetPayload<S extends boolean | null | undefined | ApartamentoServiciosDefaultArgs> = $Result.GetResult<Prisma.$ApartamentoServiciosPayload, S>

  type ApartamentoServiciosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApartamentoServiciosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApartamentoServiciosCountAggregateInputType | true
    }

  export interface ApartamentoServiciosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApartamentoServicios'], meta: { name: 'ApartamentoServicios' } }
    /**
     * Find zero or one ApartamentoServicios that matches the filter.
     * @param {ApartamentoServiciosFindUniqueArgs} args - Arguments to find a ApartamentoServicios
     * @example
     * // Get one ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApartamentoServiciosFindUniqueArgs>(args: SelectSubset<T, ApartamentoServiciosFindUniqueArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApartamentoServicios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApartamentoServiciosFindUniqueOrThrowArgs} args - Arguments to find a ApartamentoServicios
     * @example
     * // Get one ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApartamentoServiciosFindUniqueOrThrowArgs>(args: SelectSubset<T, ApartamentoServiciosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApartamentoServicios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosFindFirstArgs} args - Arguments to find a ApartamentoServicios
     * @example
     * // Get one ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApartamentoServiciosFindFirstArgs>(args?: SelectSubset<T, ApartamentoServiciosFindFirstArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApartamentoServicios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosFindFirstOrThrowArgs} args - Arguments to find a ApartamentoServicios
     * @example
     * // Get one ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApartamentoServiciosFindFirstOrThrowArgs>(args?: SelectSubset<T, ApartamentoServiciosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApartamentoServicios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findMany()
     * 
     * // Get first 10 ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apartamentoServiciosWithIdOnly = await prisma.apartamentoServicios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApartamentoServiciosFindManyArgs>(args?: SelectSubset<T, ApartamentoServiciosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApartamentoServicios.
     * @param {ApartamentoServiciosCreateArgs} args - Arguments to create a ApartamentoServicios.
     * @example
     * // Create one ApartamentoServicios
     * const ApartamentoServicios = await prisma.apartamentoServicios.create({
     *   data: {
     *     // ... data to create a ApartamentoServicios
     *   }
     * })
     * 
     */
    create<T extends ApartamentoServiciosCreateArgs>(args: SelectSubset<T, ApartamentoServiciosCreateArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApartamentoServicios.
     * @param {ApartamentoServiciosCreateManyArgs} args - Arguments to create many ApartamentoServicios.
     * @example
     * // Create many ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApartamentoServiciosCreateManyArgs>(args?: SelectSubset<T, ApartamentoServiciosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApartamentoServicios.
     * @param {ApartamentoServiciosDeleteArgs} args - Arguments to delete one ApartamentoServicios.
     * @example
     * // Delete one ApartamentoServicios
     * const ApartamentoServicios = await prisma.apartamentoServicios.delete({
     *   where: {
     *     // ... filter to delete one ApartamentoServicios
     *   }
     * })
     * 
     */
    delete<T extends ApartamentoServiciosDeleteArgs>(args: SelectSubset<T, ApartamentoServiciosDeleteArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApartamentoServicios.
     * @param {ApartamentoServiciosUpdateArgs} args - Arguments to update one ApartamentoServicios.
     * @example
     * // Update one ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApartamentoServiciosUpdateArgs>(args: SelectSubset<T, ApartamentoServiciosUpdateArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApartamentoServicios.
     * @param {ApartamentoServiciosDeleteManyArgs} args - Arguments to filter ApartamentoServicios to delete.
     * @example
     * // Delete a few ApartamentoServicios
     * const { count } = await prisma.apartamentoServicios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApartamentoServiciosDeleteManyArgs>(args?: SelectSubset<T, ApartamentoServiciosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApartamentoServicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApartamentoServiciosUpdateManyArgs>(args: SelectSubset<T, ApartamentoServiciosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApartamentoServicios.
     * @param {ApartamentoServiciosUpsertArgs} args - Arguments to update or create a ApartamentoServicios.
     * @example
     * // Update or create a ApartamentoServicios
     * const apartamentoServicios = await prisma.apartamentoServicios.upsert({
     *   create: {
     *     // ... data to create a ApartamentoServicios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApartamentoServicios we want to update
     *   }
     * })
     */
    upsert<T extends ApartamentoServiciosUpsertArgs>(args: SelectSubset<T, ApartamentoServiciosUpsertArgs<ExtArgs>>): Prisma__ApartamentoServiciosClient<$Result.GetResult<Prisma.$ApartamentoServiciosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApartamentoServicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosCountArgs} args - Arguments to filter ApartamentoServicios to count.
     * @example
     * // Count the number of ApartamentoServicios
     * const count = await prisma.apartamentoServicios.count({
     *   where: {
     *     // ... the filter for the ApartamentoServicios we want to count
     *   }
     * })
    **/
    count<T extends ApartamentoServiciosCountArgs>(
      args?: Subset<T, ApartamentoServiciosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApartamentoServiciosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApartamentoServicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApartamentoServiciosAggregateArgs>(args: Subset<T, ApartamentoServiciosAggregateArgs>): Prisma.PrismaPromise<GetApartamentoServiciosAggregateType<T>>

    /**
     * Group by ApartamentoServicios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApartamentoServiciosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApartamentoServiciosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApartamentoServiciosGroupByArgs['orderBy'] }
        : { orderBy?: ApartamentoServiciosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApartamentoServiciosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApartamentoServiciosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApartamentoServicios model
   */
  readonly fields: ApartamentoServiciosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApartamentoServicios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApartamentoServiciosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apartamento<T extends ApartamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApartamentoDefaultArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    servicio<T extends ServiciosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiciosDefaultArgs<ExtArgs>>): Prisma__ServiciosClient<$Result.GetResult<Prisma.$ServiciosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApartamentoServicios model
   */
  interface ApartamentoServiciosFieldRefs {
    readonly id: FieldRef<"ApartamentoServicios", 'String'>
    readonly apartamentoId: FieldRef<"ApartamentoServicios", 'String'>
    readonly servicioId: FieldRef<"ApartamentoServicios", 'String'>
    readonly incluido: FieldRef<"ApartamentoServicios", 'Boolean'>
    readonly costoAdicional: FieldRef<"ApartamentoServicios", 'Decimal'>
    readonly createAt: FieldRef<"ApartamentoServicios", 'DateTime'>
    readonly updateAt: FieldRef<"ApartamentoServicios", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApartamentoServicios findUnique
   */
  export type ApartamentoServiciosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter, which ApartamentoServicios to fetch.
     */
    where: ApartamentoServiciosWhereUniqueInput
  }

  /**
   * ApartamentoServicios findUniqueOrThrow
   */
  export type ApartamentoServiciosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter, which ApartamentoServicios to fetch.
     */
    where: ApartamentoServiciosWhereUniqueInput
  }

  /**
   * ApartamentoServicios findFirst
   */
  export type ApartamentoServiciosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter, which ApartamentoServicios to fetch.
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApartamentoServicios to fetch.
     */
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApartamentoServicios.
     */
    cursor?: ApartamentoServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApartamentoServicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApartamentoServicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApartamentoServicios.
     */
    distinct?: ApartamentoServiciosScalarFieldEnum | ApartamentoServiciosScalarFieldEnum[]
  }

  /**
   * ApartamentoServicios findFirstOrThrow
   */
  export type ApartamentoServiciosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter, which ApartamentoServicios to fetch.
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApartamentoServicios to fetch.
     */
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApartamentoServicios.
     */
    cursor?: ApartamentoServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApartamentoServicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApartamentoServicios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApartamentoServicios.
     */
    distinct?: ApartamentoServiciosScalarFieldEnum | ApartamentoServiciosScalarFieldEnum[]
  }

  /**
   * ApartamentoServicios findMany
   */
  export type ApartamentoServiciosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter, which ApartamentoServicios to fetch.
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApartamentoServicios to fetch.
     */
    orderBy?: ApartamentoServiciosOrderByWithRelationInput | ApartamentoServiciosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApartamentoServicios.
     */
    cursor?: ApartamentoServiciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApartamentoServicios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApartamentoServicios.
     */
    skip?: number
    distinct?: ApartamentoServiciosScalarFieldEnum | ApartamentoServiciosScalarFieldEnum[]
  }

  /**
   * ApartamentoServicios create
   */
  export type ApartamentoServiciosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * The data needed to create a ApartamentoServicios.
     */
    data: XOR<ApartamentoServiciosCreateInput, ApartamentoServiciosUncheckedCreateInput>
  }

  /**
   * ApartamentoServicios createMany
   */
  export type ApartamentoServiciosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApartamentoServicios.
     */
    data: ApartamentoServiciosCreateManyInput | ApartamentoServiciosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApartamentoServicios update
   */
  export type ApartamentoServiciosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * The data needed to update a ApartamentoServicios.
     */
    data: XOR<ApartamentoServiciosUpdateInput, ApartamentoServiciosUncheckedUpdateInput>
    /**
     * Choose, which ApartamentoServicios to update.
     */
    where: ApartamentoServiciosWhereUniqueInput
  }

  /**
   * ApartamentoServicios updateMany
   */
  export type ApartamentoServiciosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApartamentoServicios.
     */
    data: XOR<ApartamentoServiciosUpdateManyMutationInput, ApartamentoServiciosUncheckedUpdateManyInput>
    /**
     * Filter which ApartamentoServicios to update
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * Limit how many ApartamentoServicios to update.
     */
    limit?: number
  }

  /**
   * ApartamentoServicios upsert
   */
  export type ApartamentoServiciosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * The filter to search for the ApartamentoServicios to update in case it exists.
     */
    where: ApartamentoServiciosWhereUniqueInput
    /**
     * In case the ApartamentoServicios found by the `where` argument doesn't exist, create a new ApartamentoServicios with this data.
     */
    create: XOR<ApartamentoServiciosCreateInput, ApartamentoServiciosUncheckedCreateInput>
    /**
     * In case the ApartamentoServicios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApartamentoServiciosUpdateInput, ApartamentoServiciosUncheckedUpdateInput>
  }

  /**
   * ApartamentoServicios delete
   */
  export type ApartamentoServiciosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
    /**
     * Filter which ApartamentoServicios to delete.
     */
    where: ApartamentoServiciosWhereUniqueInput
  }

  /**
   * ApartamentoServicios deleteMany
   */
  export type ApartamentoServiciosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApartamentoServicios to delete
     */
    where?: ApartamentoServiciosWhereInput
    /**
     * Limit how many ApartamentoServicios to delete.
     */
    limit?: number
  }

  /**
   * ApartamentoServicios without action
   */
  export type ApartamentoServiciosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApartamentoServicios
     */
    select?: ApartamentoServiciosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApartamentoServicios
     */
    omit?: ApartamentoServiciosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApartamentoServiciosInclude<ExtArgs> | null
  }


  /**
   * Model Contratos
   */

  export type AggregateContratos = {
    _count: ContratosCountAggregateOutputType | null
    _avg: ContratosAvgAggregateOutputType | null
    _sum: ContratosSumAggregateOutputType | null
    _min: ContratosMinAggregateOutputType | null
    _max: ContratosMaxAggregateOutputType | null
  }

  export type ContratosAvgAggregateOutputType = {
    montoMensual: Decimal | null
  }

  export type ContratosSumAggregateOutputType = {
    montoMensual: Decimal | null
  }

  export type ContratosMinAggregateOutputType = {
    id: string | null
    inquilinoId: string | null
    apartamentoId: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    createAt: Date | null
    updateAt: Date | null
    montoMensual: Decimal | null
    activo: boolean | null
  }

  export type ContratosMaxAggregateOutputType = {
    id: string | null
    inquilinoId: string | null
    apartamentoId: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    createAt: Date | null
    updateAt: Date | null
    montoMensual: Decimal | null
    activo: boolean | null
  }

  export type ContratosCountAggregateOutputType = {
    id: number
    inquilinoId: number
    apartamentoId: number
    fechaInicio: number
    fechaFin: number
    createAt: number
    updateAt: number
    montoMensual: number
    activo: number
    _all: number
  }


  export type ContratosAvgAggregateInputType = {
    montoMensual?: true
  }

  export type ContratosSumAggregateInputType = {
    montoMensual?: true
  }

  export type ContratosMinAggregateInputType = {
    id?: true
    inquilinoId?: true
    apartamentoId?: true
    fechaInicio?: true
    fechaFin?: true
    createAt?: true
    updateAt?: true
    montoMensual?: true
    activo?: true
  }

  export type ContratosMaxAggregateInputType = {
    id?: true
    inquilinoId?: true
    apartamentoId?: true
    fechaInicio?: true
    fechaFin?: true
    createAt?: true
    updateAt?: true
    montoMensual?: true
    activo?: true
  }

  export type ContratosCountAggregateInputType = {
    id?: true
    inquilinoId?: true
    apartamentoId?: true
    fechaInicio?: true
    fechaFin?: true
    createAt?: true
    updateAt?: true
    montoMensual?: true
    activo?: true
    _all?: true
  }

  export type ContratosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contratos to aggregate.
     */
    where?: ContratosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contratos to fetch.
     */
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContratosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contratos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contratos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contratos
    **/
    _count?: true | ContratosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContratosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContratosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContratosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContratosMaxAggregateInputType
  }

  export type GetContratosAggregateType<T extends ContratosAggregateArgs> = {
        [P in keyof T & keyof AggregateContratos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContratos[P]>
      : GetScalarType<T[P], AggregateContratos[P]>
  }




  export type ContratosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContratosWhereInput
    orderBy?: ContratosOrderByWithAggregationInput | ContratosOrderByWithAggregationInput[]
    by: ContratosScalarFieldEnum[] | ContratosScalarFieldEnum
    having?: ContratosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContratosCountAggregateInputType | true
    _avg?: ContratosAvgAggregateInputType
    _sum?: ContratosSumAggregateInputType
    _min?: ContratosMinAggregateInputType
    _max?: ContratosMaxAggregateInputType
  }

  export type ContratosGroupByOutputType = {
    id: string
    inquilinoId: string
    apartamentoId: string
    fechaInicio: Date
    fechaFin: Date | null
    createAt: Date
    updateAt: Date
    montoMensual: Decimal
    activo: boolean
    _count: ContratosCountAggregateOutputType | null
    _avg: ContratosAvgAggregateOutputType | null
    _sum: ContratosSumAggregateOutputType | null
    _min: ContratosMinAggregateOutputType | null
    _max: ContratosMaxAggregateOutputType | null
  }

  type GetContratosGroupByPayload<T extends ContratosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContratosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContratosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContratosGroupByOutputType[P]>
            : GetScalarType<T[P], ContratosGroupByOutputType[P]>
        }
      >
    >


  export type ContratosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquilinoId?: boolean
    apartamentoId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createAt?: boolean
    updateAt?: boolean
    montoMensual?: boolean
    activo?: boolean
    inquilino?: boolean | InquilinoDefaultArgs<ExtArgs>
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    recibos?: boolean | Contratos$recibosArgs<ExtArgs>
    _count?: boolean | ContratosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contratos"]>



  export type ContratosSelectScalar = {
    id?: boolean
    inquilinoId?: boolean
    apartamentoId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createAt?: boolean
    updateAt?: boolean
    montoMensual?: boolean
    activo?: boolean
  }

  export type ContratosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inquilinoId" | "apartamentoId" | "fechaInicio" | "fechaFin" | "createAt" | "updateAt" | "montoMensual" | "activo", ExtArgs["result"]["contratos"]>
  export type ContratosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquilino?: boolean | InquilinoDefaultArgs<ExtArgs>
    apartamento?: boolean | ApartamentoDefaultArgs<ExtArgs>
    recibos?: boolean | Contratos$recibosArgs<ExtArgs>
    _count?: boolean | ContratosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ContratosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contratos"
    objects: {
      inquilino: Prisma.$InquilinoPayload<ExtArgs>
      apartamento: Prisma.$ApartamentoPayload<ExtArgs>
      recibos: Prisma.$RecibosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inquilinoId: string
      apartamentoId: string
      fechaInicio: Date
      fechaFin: Date | null
      createAt: Date
      updateAt: Date
      montoMensual: Prisma.Decimal
      activo: boolean
    }, ExtArgs["result"]["contratos"]>
    composites: {}
  }

  type ContratosGetPayload<S extends boolean | null | undefined | ContratosDefaultArgs> = $Result.GetResult<Prisma.$ContratosPayload, S>

  type ContratosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContratosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContratosCountAggregateInputType | true
    }

  export interface ContratosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contratos'], meta: { name: 'Contratos' } }
    /**
     * Find zero or one Contratos that matches the filter.
     * @param {ContratosFindUniqueArgs} args - Arguments to find a Contratos
     * @example
     * // Get one Contratos
     * const contratos = await prisma.contratos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContratosFindUniqueArgs>(args: SelectSubset<T, ContratosFindUniqueArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contratos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContratosFindUniqueOrThrowArgs} args - Arguments to find a Contratos
     * @example
     * // Get one Contratos
     * const contratos = await prisma.contratos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContratosFindUniqueOrThrowArgs>(args: SelectSubset<T, ContratosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contratos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosFindFirstArgs} args - Arguments to find a Contratos
     * @example
     * // Get one Contratos
     * const contratos = await prisma.contratos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContratosFindFirstArgs>(args?: SelectSubset<T, ContratosFindFirstArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contratos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosFindFirstOrThrowArgs} args - Arguments to find a Contratos
     * @example
     * // Get one Contratos
     * const contratos = await prisma.contratos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContratosFindFirstOrThrowArgs>(args?: SelectSubset<T, ContratosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contratos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contratos
     * const contratos = await prisma.contratos.findMany()
     * 
     * // Get first 10 Contratos
     * const contratos = await prisma.contratos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contratosWithIdOnly = await prisma.contratos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContratosFindManyArgs>(args?: SelectSubset<T, ContratosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contratos.
     * @param {ContratosCreateArgs} args - Arguments to create a Contratos.
     * @example
     * // Create one Contratos
     * const Contratos = await prisma.contratos.create({
     *   data: {
     *     // ... data to create a Contratos
     *   }
     * })
     * 
     */
    create<T extends ContratosCreateArgs>(args: SelectSubset<T, ContratosCreateArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contratos.
     * @param {ContratosCreateManyArgs} args - Arguments to create many Contratos.
     * @example
     * // Create many Contratos
     * const contratos = await prisma.contratos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContratosCreateManyArgs>(args?: SelectSubset<T, ContratosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Contratos.
     * @param {ContratosDeleteArgs} args - Arguments to delete one Contratos.
     * @example
     * // Delete one Contratos
     * const Contratos = await prisma.contratos.delete({
     *   where: {
     *     // ... filter to delete one Contratos
     *   }
     * })
     * 
     */
    delete<T extends ContratosDeleteArgs>(args: SelectSubset<T, ContratosDeleteArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contratos.
     * @param {ContratosUpdateArgs} args - Arguments to update one Contratos.
     * @example
     * // Update one Contratos
     * const contratos = await prisma.contratos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContratosUpdateArgs>(args: SelectSubset<T, ContratosUpdateArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contratos.
     * @param {ContratosDeleteManyArgs} args - Arguments to filter Contratos to delete.
     * @example
     * // Delete a few Contratos
     * const { count } = await prisma.contratos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContratosDeleteManyArgs>(args?: SelectSubset<T, ContratosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contratos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contratos
     * const contratos = await prisma.contratos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContratosUpdateManyArgs>(args: SelectSubset<T, ContratosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contratos.
     * @param {ContratosUpsertArgs} args - Arguments to update or create a Contratos.
     * @example
     * // Update or create a Contratos
     * const contratos = await prisma.contratos.upsert({
     *   create: {
     *     // ... data to create a Contratos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contratos we want to update
     *   }
     * })
     */
    upsert<T extends ContratosUpsertArgs>(args: SelectSubset<T, ContratosUpsertArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contratos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosCountArgs} args - Arguments to filter Contratos to count.
     * @example
     * // Count the number of Contratos
     * const count = await prisma.contratos.count({
     *   where: {
     *     // ... the filter for the Contratos we want to count
     *   }
     * })
    **/
    count<T extends ContratosCountArgs>(
      args?: Subset<T, ContratosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContratosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contratos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContratosAggregateArgs>(args: Subset<T, ContratosAggregateArgs>): Prisma.PrismaPromise<GetContratosAggregateType<T>>

    /**
     * Group by Contratos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContratosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContratosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContratosGroupByArgs['orderBy'] }
        : { orderBy?: ContratosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContratosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContratosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contratos model
   */
  readonly fields: ContratosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contratos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContratosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquilino<T extends InquilinoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InquilinoDefaultArgs<ExtArgs>>): Prisma__InquilinoClient<$Result.GetResult<Prisma.$InquilinoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    apartamento<T extends ApartamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApartamentoDefaultArgs<ExtArgs>>): Prisma__ApartamentoClient<$Result.GetResult<Prisma.$ApartamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recibos<T extends Contratos$recibosArgs<ExtArgs> = {}>(args?: Subset<T, Contratos$recibosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contratos model
   */
  interface ContratosFieldRefs {
    readonly id: FieldRef<"Contratos", 'String'>
    readonly inquilinoId: FieldRef<"Contratos", 'String'>
    readonly apartamentoId: FieldRef<"Contratos", 'String'>
    readonly fechaInicio: FieldRef<"Contratos", 'DateTime'>
    readonly fechaFin: FieldRef<"Contratos", 'DateTime'>
    readonly createAt: FieldRef<"Contratos", 'DateTime'>
    readonly updateAt: FieldRef<"Contratos", 'DateTime'>
    readonly montoMensual: FieldRef<"Contratos", 'Decimal'>
    readonly activo: FieldRef<"Contratos", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Contratos findUnique
   */
  export type ContratosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter, which Contratos to fetch.
     */
    where: ContratosWhereUniqueInput
  }

  /**
   * Contratos findUniqueOrThrow
   */
  export type ContratosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter, which Contratos to fetch.
     */
    where: ContratosWhereUniqueInput
  }

  /**
   * Contratos findFirst
   */
  export type ContratosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter, which Contratos to fetch.
     */
    where?: ContratosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contratos to fetch.
     */
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contratos.
     */
    cursor?: ContratosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contratos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contratos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contratos.
     */
    distinct?: ContratosScalarFieldEnum | ContratosScalarFieldEnum[]
  }

  /**
   * Contratos findFirstOrThrow
   */
  export type ContratosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter, which Contratos to fetch.
     */
    where?: ContratosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contratos to fetch.
     */
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contratos.
     */
    cursor?: ContratosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contratos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contratos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contratos.
     */
    distinct?: ContratosScalarFieldEnum | ContratosScalarFieldEnum[]
  }

  /**
   * Contratos findMany
   */
  export type ContratosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter, which Contratos to fetch.
     */
    where?: ContratosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contratos to fetch.
     */
    orderBy?: ContratosOrderByWithRelationInput | ContratosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contratos.
     */
    cursor?: ContratosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contratos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contratos.
     */
    skip?: number
    distinct?: ContratosScalarFieldEnum | ContratosScalarFieldEnum[]
  }

  /**
   * Contratos create
   */
  export type ContratosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * The data needed to create a Contratos.
     */
    data: XOR<ContratosCreateInput, ContratosUncheckedCreateInput>
  }

  /**
   * Contratos createMany
   */
  export type ContratosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contratos.
     */
    data: ContratosCreateManyInput | ContratosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contratos update
   */
  export type ContratosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * The data needed to update a Contratos.
     */
    data: XOR<ContratosUpdateInput, ContratosUncheckedUpdateInput>
    /**
     * Choose, which Contratos to update.
     */
    where: ContratosWhereUniqueInput
  }

  /**
   * Contratos updateMany
   */
  export type ContratosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contratos.
     */
    data: XOR<ContratosUpdateManyMutationInput, ContratosUncheckedUpdateManyInput>
    /**
     * Filter which Contratos to update
     */
    where?: ContratosWhereInput
    /**
     * Limit how many Contratos to update.
     */
    limit?: number
  }

  /**
   * Contratos upsert
   */
  export type ContratosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * The filter to search for the Contratos to update in case it exists.
     */
    where: ContratosWhereUniqueInput
    /**
     * In case the Contratos found by the `where` argument doesn't exist, create a new Contratos with this data.
     */
    create: XOR<ContratosCreateInput, ContratosUncheckedCreateInput>
    /**
     * In case the Contratos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContratosUpdateInput, ContratosUncheckedUpdateInput>
  }

  /**
   * Contratos delete
   */
  export type ContratosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
    /**
     * Filter which Contratos to delete.
     */
    where: ContratosWhereUniqueInput
  }

  /**
   * Contratos deleteMany
   */
  export type ContratosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contratos to delete
     */
    where?: ContratosWhereInput
    /**
     * Limit how many Contratos to delete.
     */
    limit?: number
  }

  /**
   * Contratos.recibos
   */
  export type Contratos$recibosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    where?: RecibosWhereInput
    orderBy?: RecibosOrderByWithRelationInput | RecibosOrderByWithRelationInput[]
    cursor?: RecibosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecibosScalarFieldEnum | RecibosScalarFieldEnum[]
  }

  /**
   * Contratos without action
   */
  export type ContratosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contratos
     */
    select?: ContratosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contratos
     */
    omit?: ContratosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContratosInclude<ExtArgs> | null
  }


  /**
   * Model Recibos
   */

  export type AggregateRecibos = {
    _count: RecibosCountAggregateOutputType | null
    _avg: RecibosAvgAggregateOutputType | null
    _sum: RecibosSumAggregateOutputType | null
    _min: RecibosMinAggregateOutputType | null
    _max: RecibosMaxAggregateOutputType | null
  }

  export type RecibosAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type RecibosSumAggregateOutputType = {
    total: Decimal | null
  }

  export type RecibosMinAggregateOutputType = {
    id: string | null
    contratoId: string | null
    fechaPago: Date | null
    total: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type RecibosMaxAggregateOutputType = {
    id: string | null
    contratoId: string | null
    fechaPago: Date | null
    total: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type RecibosCountAggregateOutputType = {
    id: number
    contratoId: number
    fechaPago: number
    total: number
    createAt: number
    updateAt: number
    _all: number
  }


  export type RecibosAvgAggregateInputType = {
    total?: true
  }

  export type RecibosSumAggregateInputType = {
    total?: true
  }

  export type RecibosMinAggregateInputType = {
    id?: true
    contratoId?: true
    fechaPago?: true
    total?: true
    createAt?: true
    updateAt?: true
  }

  export type RecibosMaxAggregateInputType = {
    id?: true
    contratoId?: true
    fechaPago?: true
    total?: true
    createAt?: true
    updateAt?: true
  }

  export type RecibosCountAggregateInputType = {
    id?: true
    contratoId?: true
    fechaPago?: true
    total?: true
    createAt?: true
    updateAt?: true
    _all?: true
  }

  export type RecibosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recibos to aggregate.
     */
    where?: RecibosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recibos to fetch.
     */
    orderBy?: RecibosOrderByWithRelationInput | RecibosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecibosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recibos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recibos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recibos
    **/
    _count?: true | RecibosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecibosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecibosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecibosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecibosMaxAggregateInputType
  }

  export type GetRecibosAggregateType<T extends RecibosAggregateArgs> = {
        [P in keyof T & keyof AggregateRecibos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecibos[P]>
      : GetScalarType<T[P], AggregateRecibos[P]>
  }




  export type RecibosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecibosWhereInput
    orderBy?: RecibosOrderByWithAggregationInput | RecibosOrderByWithAggregationInput[]
    by: RecibosScalarFieldEnum[] | RecibosScalarFieldEnum
    having?: RecibosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecibosCountAggregateInputType | true
    _avg?: RecibosAvgAggregateInputType
    _sum?: RecibosSumAggregateInputType
    _min?: RecibosMinAggregateInputType
    _max?: RecibosMaxAggregateInputType
  }

  export type RecibosGroupByOutputType = {
    id: string
    contratoId: string
    fechaPago: Date
    total: Decimal
    createAt: Date
    updateAt: Date
    _count: RecibosCountAggregateOutputType | null
    _avg: RecibosAvgAggregateOutputType | null
    _sum: RecibosSumAggregateOutputType | null
    _min: RecibosMinAggregateOutputType | null
    _max: RecibosMaxAggregateOutputType | null
  }

  type GetRecibosGroupByPayload<T extends RecibosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecibosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecibosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecibosGroupByOutputType[P]>
            : GetScalarType<T[P], RecibosGroupByOutputType[P]>
        }
      >
    >


  export type RecibosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contratoId?: boolean
    fechaPago?: boolean
    total?: boolean
    createAt?: boolean
    updateAt?: boolean
    contrato?: boolean | ContratosDefaultArgs<ExtArgs>
    detalles?: boolean | Recibos$detallesArgs<ExtArgs>
    _count?: boolean | RecibosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recibos"]>



  export type RecibosSelectScalar = {
    id?: boolean
    contratoId?: boolean
    fechaPago?: boolean
    total?: boolean
    createAt?: boolean
    updateAt?: boolean
  }

  export type RecibosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contratoId" | "fechaPago" | "total" | "createAt" | "updateAt", ExtArgs["result"]["recibos"]>
  export type RecibosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contrato?: boolean | ContratosDefaultArgs<ExtArgs>
    detalles?: boolean | Recibos$detallesArgs<ExtArgs>
    _count?: boolean | RecibosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RecibosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recibos"
    objects: {
      contrato: Prisma.$ContratosPayload<ExtArgs>
      detalles: Prisma.$ReciboDetallesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contratoId: string
      fechaPago: Date
      total: Prisma.Decimal
      createAt: Date
      updateAt: Date
    }, ExtArgs["result"]["recibos"]>
    composites: {}
  }

  type RecibosGetPayload<S extends boolean | null | undefined | RecibosDefaultArgs> = $Result.GetResult<Prisma.$RecibosPayload, S>

  type RecibosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecibosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecibosCountAggregateInputType | true
    }

  export interface RecibosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recibos'], meta: { name: 'Recibos' } }
    /**
     * Find zero or one Recibos that matches the filter.
     * @param {RecibosFindUniqueArgs} args - Arguments to find a Recibos
     * @example
     * // Get one Recibos
     * const recibos = await prisma.recibos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecibosFindUniqueArgs>(args: SelectSubset<T, RecibosFindUniqueArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recibos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecibosFindUniqueOrThrowArgs} args - Arguments to find a Recibos
     * @example
     * // Get one Recibos
     * const recibos = await prisma.recibos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecibosFindUniqueOrThrowArgs>(args: SelectSubset<T, RecibosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recibos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosFindFirstArgs} args - Arguments to find a Recibos
     * @example
     * // Get one Recibos
     * const recibos = await prisma.recibos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecibosFindFirstArgs>(args?: SelectSubset<T, RecibosFindFirstArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recibos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosFindFirstOrThrowArgs} args - Arguments to find a Recibos
     * @example
     * // Get one Recibos
     * const recibos = await prisma.recibos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecibosFindFirstOrThrowArgs>(args?: SelectSubset<T, RecibosFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recibos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recibos
     * const recibos = await prisma.recibos.findMany()
     * 
     * // Get first 10 Recibos
     * const recibos = await prisma.recibos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recibosWithIdOnly = await prisma.recibos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecibosFindManyArgs>(args?: SelectSubset<T, RecibosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recibos.
     * @param {RecibosCreateArgs} args - Arguments to create a Recibos.
     * @example
     * // Create one Recibos
     * const Recibos = await prisma.recibos.create({
     *   data: {
     *     // ... data to create a Recibos
     *   }
     * })
     * 
     */
    create<T extends RecibosCreateArgs>(args: SelectSubset<T, RecibosCreateArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recibos.
     * @param {RecibosCreateManyArgs} args - Arguments to create many Recibos.
     * @example
     * // Create many Recibos
     * const recibos = await prisma.recibos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecibosCreateManyArgs>(args?: SelectSubset<T, RecibosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recibos.
     * @param {RecibosDeleteArgs} args - Arguments to delete one Recibos.
     * @example
     * // Delete one Recibos
     * const Recibos = await prisma.recibos.delete({
     *   where: {
     *     // ... filter to delete one Recibos
     *   }
     * })
     * 
     */
    delete<T extends RecibosDeleteArgs>(args: SelectSubset<T, RecibosDeleteArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recibos.
     * @param {RecibosUpdateArgs} args - Arguments to update one Recibos.
     * @example
     * // Update one Recibos
     * const recibos = await prisma.recibos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecibosUpdateArgs>(args: SelectSubset<T, RecibosUpdateArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recibos.
     * @param {RecibosDeleteManyArgs} args - Arguments to filter Recibos to delete.
     * @example
     * // Delete a few Recibos
     * const { count } = await prisma.recibos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecibosDeleteManyArgs>(args?: SelectSubset<T, RecibosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recibos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recibos
     * const recibos = await prisma.recibos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecibosUpdateManyArgs>(args: SelectSubset<T, RecibosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recibos.
     * @param {RecibosUpsertArgs} args - Arguments to update or create a Recibos.
     * @example
     * // Update or create a Recibos
     * const recibos = await prisma.recibos.upsert({
     *   create: {
     *     // ... data to create a Recibos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recibos we want to update
     *   }
     * })
     */
    upsert<T extends RecibosUpsertArgs>(args: SelectSubset<T, RecibosUpsertArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recibos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosCountArgs} args - Arguments to filter Recibos to count.
     * @example
     * // Count the number of Recibos
     * const count = await prisma.recibos.count({
     *   where: {
     *     // ... the filter for the Recibos we want to count
     *   }
     * })
    **/
    count<T extends RecibosCountArgs>(
      args?: Subset<T, RecibosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecibosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recibos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecibosAggregateArgs>(args: Subset<T, RecibosAggregateArgs>): Prisma.PrismaPromise<GetRecibosAggregateType<T>>

    /**
     * Group by Recibos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecibosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecibosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecibosGroupByArgs['orderBy'] }
        : { orderBy?: RecibosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecibosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecibosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recibos model
   */
  readonly fields: RecibosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recibos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecibosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contrato<T extends ContratosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContratosDefaultArgs<ExtArgs>>): Prisma__ContratosClient<$Result.GetResult<Prisma.$ContratosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    detalles<T extends Recibos$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Recibos$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recibos model
   */
  interface RecibosFieldRefs {
    readonly id: FieldRef<"Recibos", 'String'>
    readonly contratoId: FieldRef<"Recibos", 'String'>
    readonly fechaPago: FieldRef<"Recibos", 'DateTime'>
    readonly total: FieldRef<"Recibos", 'Decimal'>
    readonly createAt: FieldRef<"Recibos", 'DateTime'>
    readonly updateAt: FieldRef<"Recibos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recibos findUnique
   */
  export type RecibosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter, which Recibos to fetch.
     */
    where: RecibosWhereUniqueInput
  }

  /**
   * Recibos findUniqueOrThrow
   */
  export type RecibosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter, which Recibos to fetch.
     */
    where: RecibosWhereUniqueInput
  }

  /**
   * Recibos findFirst
   */
  export type RecibosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter, which Recibos to fetch.
     */
    where?: RecibosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recibos to fetch.
     */
    orderBy?: RecibosOrderByWithRelationInput | RecibosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recibos.
     */
    cursor?: RecibosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recibos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recibos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recibos.
     */
    distinct?: RecibosScalarFieldEnum | RecibosScalarFieldEnum[]
  }

  /**
   * Recibos findFirstOrThrow
   */
  export type RecibosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter, which Recibos to fetch.
     */
    where?: RecibosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recibos to fetch.
     */
    orderBy?: RecibosOrderByWithRelationInput | RecibosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recibos.
     */
    cursor?: RecibosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recibos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recibos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recibos.
     */
    distinct?: RecibosScalarFieldEnum | RecibosScalarFieldEnum[]
  }

  /**
   * Recibos findMany
   */
  export type RecibosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter, which Recibos to fetch.
     */
    where?: RecibosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recibos to fetch.
     */
    orderBy?: RecibosOrderByWithRelationInput | RecibosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recibos.
     */
    cursor?: RecibosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recibos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recibos.
     */
    skip?: number
    distinct?: RecibosScalarFieldEnum | RecibosScalarFieldEnum[]
  }

  /**
   * Recibos create
   */
  export type RecibosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * The data needed to create a Recibos.
     */
    data: XOR<RecibosCreateInput, RecibosUncheckedCreateInput>
  }

  /**
   * Recibos createMany
   */
  export type RecibosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recibos.
     */
    data: RecibosCreateManyInput | RecibosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recibos update
   */
  export type RecibosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * The data needed to update a Recibos.
     */
    data: XOR<RecibosUpdateInput, RecibosUncheckedUpdateInput>
    /**
     * Choose, which Recibos to update.
     */
    where: RecibosWhereUniqueInput
  }

  /**
   * Recibos updateMany
   */
  export type RecibosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recibos.
     */
    data: XOR<RecibosUpdateManyMutationInput, RecibosUncheckedUpdateManyInput>
    /**
     * Filter which Recibos to update
     */
    where?: RecibosWhereInput
    /**
     * Limit how many Recibos to update.
     */
    limit?: number
  }

  /**
   * Recibos upsert
   */
  export type RecibosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * The filter to search for the Recibos to update in case it exists.
     */
    where: RecibosWhereUniqueInput
    /**
     * In case the Recibos found by the `where` argument doesn't exist, create a new Recibos with this data.
     */
    create: XOR<RecibosCreateInput, RecibosUncheckedCreateInput>
    /**
     * In case the Recibos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecibosUpdateInput, RecibosUncheckedUpdateInput>
  }

  /**
   * Recibos delete
   */
  export type RecibosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
    /**
     * Filter which Recibos to delete.
     */
    where: RecibosWhereUniqueInput
  }

  /**
   * Recibos deleteMany
   */
  export type RecibosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recibos to delete
     */
    where?: RecibosWhereInput
    /**
     * Limit how many Recibos to delete.
     */
    limit?: number
  }

  /**
   * Recibos.detalles
   */
  export type Recibos$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    where?: ReciboDetallesWhereInput
    orderBy?: ReciboDetallesOrderByWithRelationInput | ReciboDetallesOrderByWithRelationInput[]
    cursor?: ReciboDetallesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReciboDetallesScalarFieldEnum | ReciboDetallesScalarFieldEnum[]
  }

  /**
   * Recibos without action
   */
  export type RecibosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recibos
     */
    select?: RecibosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recibos
     */
    omit?: RecibosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecibosInclude<ExtArgs> | null
  }


  /**
   * Model ReciboDetalles
   */

  export type AggregateReciboDetalles = {
    _count: ReciboDetallesCountAggregateOutputType | null
    _avg: ReciboDetallesAvgAggregateOutputType | null
    _sum: ReciboDetallesSumAggregateOutputType | null
    _min: ReciboDetallesMinAggregateOutputType | null
    _max: ReciboDetallesMaxAggregateOutputType | null
  }

  export type ReciboDetallesAvgAggregateOutputType = {
    monto: Decimal | null
  }

  export type ReciboDetallesSumAggregateOutputType = {
    monto: Decimal | null
  }

  export type ReciboDetallesMinAggregateOutputType = {
    id: string | null
    reciboId: string | null
    descripcion: string | null
    monto: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ReciboDetallesMaxAggregateOutputType = {
    id: string | null
    reciboId: string | null
    descripcion: string | null
    monto: Decimal | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ReciboDetallesCountAggregateOutputType = {
    id: number
    reciboId: number
    descripcion: number
    monto: number
    createAt: number
    updateAt: number
    _all: number
  }


  export type ReciboDetallesAvgAggregateInputType = {
    monto?: true
  }

  export type ReciboDetallesSumAggregateInputType = {
    monto?: true
  }

  export type ReciboDetallesMinAggregateInputType = {
    id?: true
    reciboId?: true
    descripcion?: true
    monto?: true
    createAt?: true
    updateAt?: true
  }

  export type ReciboDetallesMaxAggregateInputType = {
    id?: true
    reciboId?: true
    descripcion?: true
    monto?: true
    createAt?: true
    updateAt?: true
  }

  export type ReciboDetallesCountAggregateInputType = {
    id?: true
    reciboId?: true
    descripcion?: true
    monto?: true
    createAt?: true
    updateAt?: true
    _all?: true
  }

  export type ReciboDetallesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReciboDetalles to aggregate.
     */
    where?: ReciboDetallesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReciboDetalles to fetch.
     */
    orderBy?: ReciboDetallesOrderByWithRelationInput | ReciboDetallesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReciboDetallesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReciboDetalles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReciboDetalles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReciboDetalles
    **/
    _count?: true | ReciboDetallesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReciboDetallesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReciboDetallesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReciboDetallesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReciboDetallesMaxAggregateInputType
  }

  export type GetReciboDetallesAggregateType<T extends ReciboDetallesAggregateArgs> = {
        [P in keyof T & keyof AggregateReciboDetalles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReciboDetalles[P]>
      : GetScalarType<T[P], AggregateReciboDetalles[P]>
  }




  export type ReciboDetallesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReciboDetallesWhereInput
    orderBy?: ReciboDetallesOrderByWithAggregationInput | ReciboDetallesOrderByWithAggregationInput[]
    by: ReciboDetallesScalarFieldEnum[] | ReciboDetallesScalarFieldEnum
    having?: ReciboDetallesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReciboDetallesCountAggregateInputType | true
    _avg?: ReciboDetallesAvgAggregateInputType
    _sum?: ReciboDetallesSumAggregateInputType
    _min?: ReciboDetallesMinAggregateInputType
    _max?: ReciboDetallesMaxAggregateInputType
  }

  export type ReciboDetallesGroupByOutputType = {
    id: string
    reciboId: string
    descripcion: string
    monto: Decimal
    createAt: Date
    updateAt: Date
    _count: ReciboDetallesCountAggregateOutputType | null
    _avg: ReciboDetallesAvgAggregateOutputType | null
    _sum: ReciboDetallesSumAggregateOutputType | null
    _min: ReciboDetallesMinAggregateOutputType | null
    _max: ReciboDetallesMaxAggregateOutputType | null
  }

  type GetReciboDetallesGroupByPayload<T extends ReciboDetallesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReciboDetallesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReciboDetallesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReciboDetallesGroupByOutputType[P]>
            : GetScalarType<T[P], ReciboDetallesGroupByOutputType[P]>
        }
      >
    >


  export type ReciboDetallesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reciboId?: boolean
    descripcion?: boolean
    monto?: boolean
    createAt?: boolean
    updateAt?: boolean
    recibo?: boolean | RecibosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reciboDetalles"]>



  export type ReciboDetallesSelectScalar = {
    id?: boolean
    reciboId?: boolean
    descripcion?: boolean
    monto?: boolean
    createAt?: boolean
    updateAt?: boolean
  }

  export type ReciboDetallesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reciboId" | "descripcion" | "monto" | "createAt" | "updateAt", ExtArgs["result"]["reciboDetalles"]>
  export type ReciboDetallesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recibo?: boolean | RecibosDefaultArgs<ExtArgs>
  }

  export type $ReciboDetallesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReciboDetalles"
    objects: {
      recibo: Prisma.$RecibosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reciboId: string
      descripcion: string
      monto: Prisma.Decimal
      createAt: Date
      updateAt: Date
    }, ExtArgs["result"]["reciboDetalles"]>
    composites: {}
  }

  type ReciboDetallesGetPayload<S extends boolean | null | undefined | ReciboDetallesDefaultArgs> = $Result.GetResult<Prisma.$ReciboDetallesPayload, S>

  type ReciboDetallesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReciboDetallesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReciboDetallesCountAggregateInputType | true
    }

  export interface ReciboDetallesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReciboDetalles'], meta: { name: 'ReciboDetalles' } }
    /**
     * Find zero or one ReciboDetalles that matches the filter.
     * @param {ReciboDetallesFindUniqueArgs} args - Arguments to find a ReciboDetalles
     * @example
     * // Get one ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReciboDetallesFindUniqueArgs>(args: SelectSubset<T, ReciboDetallesFindUniqueArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReciboDetalles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReciboDetallesFindUniqueOrThrowArgs} args - Arguments to find a ReciboDetalles
     * @example
     * // Get one ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReciboDetallesFindUniqueOrThrowArgs>(args: SelectSubset<T, ReciboDetallesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReciboDetalles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesFindFirstArgs} args - Arguments to find a ReciboDetalles
     * @example
     * // Get one ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReciboDetallesFindFirstArgs>(args?: SelectSubset<T, ReciboDetallesFindFirstArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReciboDetalles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesFindFirstOrThrowArgs} args - Arguments to find a ReciboDetalles
     * @example
     * // Get one ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReciboDetallesFindFirstOrThrowArgs>(args?: SelectSubset<T, ReciboDetallesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReciboDetalles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findMany()
     * 
     * // Get first 10 ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reciboDetallesWithIdOnly = await prisma.reciboDetalles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReciboDetallesFindManyArgs>(args?: SelectSubset<T, ReciboDetallesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReciboDetalles.
     * @param {ReciboDetallesCreateArgs} args - Arguments to create a ReciboDetalles.
     * @example
     * // Create one ReciboDetalles
     * const ReciboDetalles = await prisma.reciboDetalles.create({
     *   data: {
     *     // ... data to create a ReciboDetalles
     *   }
     * })
     * 
     */
    create<T extends ReciboDetallesCreateArgs>(args: SelectSubset<T, ReciboDetallesCreateArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReciboDetalles.
     * @param {ReciboDetallesCreateManyArgs} args - Arguments to create many ReciboDetalles.
     * @example
     * // Create many ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReciboDetallesCreateManyArgs>(args?: SelectSubset<T, ReciboDetallesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ReciboDetalles.
     * @param {ReciboDetallesDeleteArgs} args - Arguments to delete one ReciboDetalles.
     * @example
     * // Delete one ReciboDetalles
     * const ReciboDetalles = await prisma.reciboDetalles.delete({
     *   where: {
     *     // ... filter to delete one ReciboDetalles
     *   }
     * })
     * 
     */
    delete<T extends ReciboDetallesDeleteArgs>(args: SelectSubset<T, ReciboDetallesDeleteArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReciboDetalles.
     * @param {ReciboDetallesUpdateArgs} args - Arguments to update one ReciboDetalles.
     * @example
     * // Update one ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReciboDetallesUpdateArgs>(args: SelectSubset<T, ReciboDetallesUpdateArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReciboDetalles.
     * @param {ReciboDetallesDeleteManyArgs} args - Arguments to filter ReciboDetalles to delete.
     * @example
     * // Delete a few ReciboDetalles
     * const { count } = await prisma.reciboDetalles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReciboDetallesDeleteManyArgs>(args?: SelectSubset<T, ReciboDetallesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReciboDetalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReciboDetallesUpdateManyArgs>(args: SelectSubset<T, ReciboDetallesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReciboDetalles.
     * @param {ReciboDetallesUpsertArgs} args - Arguments to update or create a ReciboDetalles.
     * @example
     * // Update or create a ReciboDetalles
     * const reciboDetalles = await prisma.reciboDetalles.upsert({
     *   create: {
     *     // ... data to create a ReciboDetalles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReciboDetalles we want to update
     *   }
     * })
     */
    upsert<T extends ReciboDetallesUpsertArgs>(args: SelectSubset<T, ReciboDetallesUpsertArgs<ExtArgs>>): Prisma__ReciboDetallesClient<$Result.GetResult<Prisma.$ReciboDetallesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReciboDetalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesCountArgs} args - Arguments to filter ReciboDetalles to count.
     * @example
     * // Count the number of ReciboDetalles
     * const count = await prisma.reciboDetalles.count({
     *   where: {
     *     // ... the filter for the ReciboDetalles we want to count
     *   }
     * })
    **/
    count<T extends ReciboDetallesCountArgs>(
      args?: Subset<T, ReciboDetallesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReciboDetallesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReciboDetalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReciboDetallesAggregateArgs>(args: Subset<T, ReciboDetallesAggregateArgs>): Prisma.PrismaPromise<GetReciboDetallesAggregateType<T>>

    /**
     * Group by ReciboDetalles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReciboDetallesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReciboDetallesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReciboDetallesGroupByArgs['orderBy'] }
        : { orderBy?: ReciboDetallesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReciboDetallesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReciboDetallesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReciboDetalles model
   */
  readonly fields: ReciboDetallesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReciboDetalles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReciboDetallesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recibo<T extends RecibosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecibosDefaultArgs<ExtArgs>>): Prisma__RecibosClient<$Result.GetResult<Prisma.$RecibosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReciboDetalles model
   */
  interface ReciboDetallesFieldRefs {
    readonly id: FieldRef<"ReciboDetalles", 'String'>
    readonly reciboId: FieldRef<"ReciboDetalles", 'String'>
    readonly descripcion: FieldRef<"ReciboDetalles", 'String'>
    readonly monto: FieldRef<"ReciboDetalles", 'Decimal'>
    readonly createAt: FieldRef<"ReciboDetalles", 'DateTime'>
    readonly updateAt: FieldRef<"ReciboDetalles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReciboDetalles findUnique
   */
  export type ReciboDetallesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter, which ReciboDetalles to fetch.
     */
    where: ReciboDetallesWhereUniqueInput
  }

  /**
   * ReciboDetalles findUniqueOrThrow
   */
  export type ReciboDetallesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter, which ReciboDetalles to fetch.
     */
    where: ReciboDetallesWhereUniqueInput
  }

  /**
   * ReciboDetalles findFirst
   */
  export type ReciboDetallesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter, which ReciboDetalles to fetch.
     */
    where?: ReciboDetallesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReciboDetalles to fetch.
     */
    orderBy?: ReciboDetallesOrderByWithRelationInput | ReciboDetallesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReciboDetalles.
     */
    cursor?: ReciboDetallesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReciboDetalles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReciboDetalles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReciboDetalles.
     */
    distinct?: ReciboDetallesScalarFieldEnum | ReciboDetallesScalarFieldEnum[]
  }

  /**
   * ReciboDetalles findFirstOrThrow
   */
  export type ReciboDetallesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter, which ReciboDetalles to fetch.
     */
    where?: ReciboDetallesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReciboDetalles to fetch.
     */
    orderBy?: ReciboDetallesOrderByWithRelationInput | ReciboDetallesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReciboDetalles.
     */
    cursor?: ReciboDetallesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReciboDetalles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReciboDetalles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReciboDetalles.
     */
    distinct?: ReciboDetallesScalarFieldEnum | ReciboDetallesScalarFieldEnum[]
  }

  /**
   * ReciboDetalles findMany
   */
  export type ReciboDetallesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter, which ReciboDetalles to fetch.
     */
    where?: ReciboDetallesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReciboDetalles to fetch.
     */
    orderBy?: ReciboDetallesOrderByWithRelationInput | ReciboDetallesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReciboDetalles.
     */
    cursor?: ReciboDetallesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReciboDetalles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReciboDetalles.
     */
    skip?: number
    distinct?: ReciboDetallesScalarFieldEnum | ReciboDetallesScalarFieldEnum[]
  }

  /**
   * ReciboDetalles create
   */
  export type ReciboDetallesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * The data needed to create a ReciboDetalles.
     */
    data: XOR<ReciboDetallesCreateInput, ReciboDetallesUncheckedCreateInput>
  }

  /**
   * ReciboDetalles createMany
   */
  export type ReciboDetallesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReciboDetalles.
     */
    data: ReciboDetallesCreateManyInput | ReciboDetallesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReciboDetalles update
   */
  export type ReciboDetallesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * The data needed to update a ReciboDetalles.
     */
    data: XOR<ReciboDetallesUpdateInput, ReciboDetallesUncheckedUpdateInput>
    /**
     * Choose, which ReciboDetalles to update.
     */
    where: ReciboDetallesWhereUniqueInput
  }

  /**
   * ReciboDetalles updateMany
   */
  export type ReciboDetallesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReciboDetalles.
     */
    data: XOR<ReciboDetallesUpdateManyMutationInput, ReciboDetallesUncheckedUpdateManyInput>
    /**
     * Filter which ReciboDetalles to update
     */
    where?: ReciboDetallesWhereInput
    /**
     * Limit how many ReciboDetalles to update.
     */
    limit?: number
  }

  /**
   * ReciboDetalles upsert
   */
  export type ReciboDetallesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * The filter to search for the ReciboDetalles to update in case it exists.
     */
    where: ReciboDetallesWhereUniqueInput
    /**
     * In case the ReciboDetalles found by the `where` argument doesn't exist, create a new ReciboDetalles with this data.
     */
    create: XOR<ReciboDetallesCreateInput, ReciboDetallesUncheckedCreateInput>
    /**
     * In case the ReciboDetalles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReciboDetallesUpdateInput, ReciboDetallesUncheckedUpdateInput>
  }

  /**
   * ReciboDetalles delete
   */
  export type ReciboDetallesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
    /**
     * Filter which ReciboDetalles to delete.
     */
    where: ReciboDetallesWhereUniqueInput
  }

  /**
   * ReciboDetalles deleteMany
   */
  export type ReciboDetallesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReciboDetalles to delete
     */
    where?: ReciboDetallesWhereInput
    /**
     * Limit how many ReciboDetalles to delete.
     */
    limit?: number
  }

  /**
   * ReciboDetalles without action
   */
  export type ReciboDetallesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReciboDetalles
     */
    select?: ReciboDetallesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReciboDetalles
     */
    omit?: ReciboDetallesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReciboDetallesInclude<ExtArgs> | null
  }


  /**
   * Model Permiso
   */

  export type AggregatePermiso = {
    _count: PermisoCountAggregateOutputType | null
    _min: PermisoMinAggregateOutputType | null
    _max: PermisoMaxAggregateOutputType | null
  }

  export type PermisoMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type PermisoMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
  }

  export type PermisoCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    createAt: number
    updateAt: number
    activo: number
    _all: number
  }


  export type PermisoMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type PermisoMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
  }

  export type PermisoCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createAt?: true
    updateAt?: true
    activo?: true
    _all?: true
  }

  export type PermisoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permiso to aggregate.
     */
    where?: PermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permisos to fetch.
     */
    orderBy?: PermisoOrderByWithRelationInput | PermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permisos
    **/
    _count?: true | PermisoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermisoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermisoMaxAggregateInputType
  }

  export type GetPermisoAggregateType<T extends PermisoAggregateArgs> = {
        [P in keyof T & keyof AggregatePermiso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermiso[P]>
      : GetScalarType<T[P], AggregatePermiso[P]>
  }




  export type PermisoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermisoWhereInput
    orderBy?: PermisoOrderByWithAggregationInput | PermisoOrderByWithAggregationInput[]
    by: PermisoScalarFieldEnum[] | PermisoScalarFieldEnum
    having?: PermisoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermisoCountAggregateInputType | true
    _min?: PermisoMinAggregateInputType
    _max?: PermisoMaxAggregateInputType
  }

  export type PermisoGroupByOutputType = {
    id: string
    nombre: string
    descripcion: string
    createAt: Date
    updateAt: Date
    activo: boolean
    _count: PermisoCountAggregateOutputType | null
    _min: PermisoMinAggregateOutputType | null
    _max: PermisoMaxAggregateOutputType | null
  }

  type GetPermisoGroupByPayload<T extends PermisoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermisoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermisoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermisoGroupByOutputType[P]>
            : GetScalarType<T[P], PermisoGroupByOutputType[P]>
        }
      >
    >


  export type PermisoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    roles?: boolean | Permiso$rolesArgs<ExtArgs>
    _count?: boolean | PermisoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permiso"]>



  export type PermisoSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
  }

  export type PermisoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "descripcion" | "createAt" | "updateAt" | "activo", ExtArgs["result"]["permiso"]>
  export type PermisoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Permiso$rolesArgs<ExtArgs>
    _count?: boolean | PermisoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PermisoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permiso"
    objects: {
      roles: Prisma.$RolPermisoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      descripcion: string
      createAt: Date
      updateAt: Date
      activo: boolean
    }, ExtArgs["result"]["permiso"]>
    composites: {}
  }

  type PermisoGetPayload<S extends boolean | null | undefined | PermisoDefaultArgs> = $Result.GetResult<Prisma.$PermisoPayload, S>

  type PermisoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermisoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermisoCountAggregateInputType | true
    }

  export interface PermisoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permiso'], meta: { name: 'Permiso' } }
    /**
     * Find zero or one Permiso that matches the filter.
     * @param {PermisoFindUniqueArgs} args - Arguments to find a Permiso
     * @example
     * // Get one Permiso
     * const permiso = await prisma.permiso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermisoFindUniqueArgs>(args: SelectSubset<T, PermisoFindUniqueArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permiso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermisoFindUniqueOrThrowArgs} args - Arguments to find a Permiso
     * @example
     * // Get one Permiso
     * const permiso = await prisma.permiso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermisoFindUniqueOrThrowArgs>(args: SelectSubset<T, PermisoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permiso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoFindFirstArgs} args - Arguments to find a Permiso
     * @example
     * // Get one Permiso
     * const permiso = await prisma.permiso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermisoFindFirstArgs>(args?: SelectSubset<T, PermisoFindFirstArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permiso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoFindFirstOrThrowArgs} args - Arguments to find a Permiso
     * @example
     * // Get one Permiso
     * const permiso = await prisma.permiso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermisoFindFirstOrThrowArgs>(args?: SelectSubset<T, PermisoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permisos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permisos
     * const permisos = await prisma.permiso.findMany()
     * 
     * // Get first 10 Permisos
     * const permisos = await prisma.permiso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permisoWithIdOnly = await prisma.permiso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermisoFindManyArgs>(args?: SelectSubset<T, PermisoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permiso.
     * @param {PermisoCreateArgs} args - Arguments to create a Permiso.
     * @example
     * // Create one Permiso
     * const Permiso = await prisma.permiso.create({
     *   data: {
     *     // ... data to create a Permiso
     *   }
     * })
     * 
     */
    create<T extends PermisoCreateArgs>(args: SelectSubset<T, PermisoCreateArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permisos.
     * @param {PermisoCreateManyArgs} args - Arguments to create many Permisos.
     * @example
     * // Create many Permisos
     * const permiso = await prisma.permiso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermisoCreateManyArgs>(args?: SelectSubset<T, PermisoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Permiso.
     * @param {PermisoDeleteArgs} args - Arguments to delete one Permiso.
     * @example
     * // Delete one Permiso
     * const Permiso = await prisma.permiso.delete({
     *   where: {
     *     // ... filter to delete one Permiso
     *   }
     * })
     * 
     */
    delete<T extends PermisoDeleteArgs>(args: SelectSubset<T, PermisoDeleteArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permiso.
     * @param {PermisoUpdateArgs} args - Arguments to update one Permiso.
     * @example
     * // Update one Permiso
     * const permiso = await prisma.permiso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermisoUpdateArgs>(args: SelectSubset<T, PermisoUpdateArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permisos.
     * @param {PermisoDeleteManyArgs} args - Arguments to filter Permisos to delete.
     * @example
     * // Delete a few Permisos
     * const { count } = await prisma.permiso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermisoDeleteManyArgs>(args?: SelectSubset<T, PermisoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permisos
     * const permiso = await prisma.permiso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermisoUpdateManyArgs>(args: SelectSubset<T, PermisoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Permiso.
     * @param {PermisoUpsertArgs} args - Arguments to update or create a Permiso.
     * @example
     * // Update or create a Permiso
     * const permiso = await prisma.permiso.upsert({
     *   create: {
     *     // ... data to create a Permiso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permiso we want to update
     *   }
     * })
     */
    upsert<T extends PermisoUpsertArgs>(args: SelectSubset<T, PermisoUpsertArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoCountArgs} args - Arguments to filter Permisos to count.
     * @example
     * // Count the number of Permisos
     * const count = await prisma.permiso.count({
     *   where: {
     *     // ... the filter for the Permisos we want to count
     *   }
     * })
    **/
    count<T extends PermisoCountArgs>(
      args?: Subset<T, PermisoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermisoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermisoAggregateArgs>(args: Subset<T, PermisoAggregateArgs>): Prisma.PrismaPromise<GetPermisoAggregateType<T>>

    /**
     * Group by Permiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermisoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermisoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermisoGroupByArgs['orderBy'] }
        : { orderBy?: PermisoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermisoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermisoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permiso model
   */
  readonly fields: PermisoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permiso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermisoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Permiso$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Permiso$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permiso model
   */
  interface PermisoFieldRefs {
    readonly id: FieldRef<"Permiso", 'String'>
    readonly nombre: FieldRef<"Permiso", 'String'>
    readonly descripcion: FieldRef<"Permiso", 'String'>
    readonly createAt: FieldRef<"Permiso", 'DateTime'>
    readonly updateAt: FieldRef<"Permiso", 'DateTime'>
    readonly activo: FieldRef<"Permiso", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Permiso findUnique
   */
  export type PermisoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter, which Permiso to fetch.
     */
    where: PermisoWhereUniqueInput
  }

  /**
   * Permiso findUniqueOrThrow
   */
  export type PermisoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter, which Permiso to fetch.
     */
    where: PermisoWhereUniqueInput
  }

  /**
   * Permiso findFirst
   */
  export type PermisoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter, which Permiso to fetch.
     */
    where?: PermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permisos to fetch.
     */
    orderBy?: PermisoOrderByWithRelationInput | PermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permisos.
     */
    cursor?: PermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permisos.
     */
    distinct?: PermisoScalarFieldEnum | PermisoScalarFieldEnum[]
  }

  /**
   * Permiso findFirstOrThrow
   */
  export type PermisoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter, which Permiso to fetch.
     */
    where?: PermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permisos to fetch.
     */
    orderBy?: PermisoOrderByWithRelationInput | PermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permisos.
     */
    cursor?: PermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permisos.
     */
    distinct?: PermisoScalarFieldEnum | PermisoScalarFieldEnum[]
  }

  /**
   * Permiso findMany
   */
  export type PermisoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter, which Permisos to fetch.
     */
    where?: PermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permisos to fetch.
     */
    orderBy?: PermisoOrderByWithRelationInput | PermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permisos.
     */
    cursor?: PermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permisos.
     */
    skip?: number
    distinct?: PermisoScalarFieldEnum | PermisoScalarFieldEnum[]
  }

  /**
   * Permiso create
   */
  export type PermisoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * The data needed to create a Permiso.
     */
    data: XOR<PermisoCreateInput, PermisoUncheckedCreateInput>
  }

  /**
   * Permiso createMany
   */
  export type PermisoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permisos.
     */
    data: PermisoCreateManyInput | PermisoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permiso update
   */
  export type PermisoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * The data needed to update a Permiso.
     */
    data: XOR<PermisoUpdateInput, PermisoUncheckedUpdateInput>
    /**
     * Choose, which Permiso to update.
     */
    where: PermisoWhereUniqueInput
  }

  /**
   * Permiso updateMany
   */
  export type PermisoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permisos.
     */
    data: XOR<PermisoUpdateManyMutationInput, PermisoUncheckedUpdateManyInput>
    /**
     * Filter which Permisos to update
     */
    where?: PermisoWhereInput
    /**
     * Limit how many Permisos to update.
     */
    limit?: number
  }

  /**
   * Permiso upsert
   */
  export type PermisoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * The filter to search for the Permiso to update in case it exists.
     */
    where: PermisoWhereUniqueInput
    /**
     * In case the Permiso found by the `where` argument doesn't exist, create a new Permiso with this data.
     */
    create: XOR<PermisoCreateInput, PermisoUncheckedCreateInput>
    /**
     * In case the Permiso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermisoUpdateInput, PermisoUncheckedUpdateInput>
  }

  /**
   * Permiso delete
   */
  export type PermisoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
    /**
     * Filter which Permiso to delete.
     */
    where: PermisoWhereUniqueInput
  }

  /**
   * Permiso deleteMany
   */
  export type PermisoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permisos to delete
     */
    where?: PermisoWhereInput
    /**
     * Limit how many Permisos to delete.
     */
    limit?: number
  }

  /**
   * Permiso.roles
   */
  export type Permiso$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    cursor?: RolPermisoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }

  /**
   * Permiso without action
   */
  export type PermisoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permiso
     */
    select?: PermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permiso
     */
    omit?: PermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermisoInclude<ExtArgs> | null
  }


  /**
   * Model RolPermiso
   */

  export type AggregateRolPermiso = {
    _count: RolPermisoCountAggregateOutputType | null
    _min: RolPermisoMinAggregateOutputType | null
    _max: RolPermisoMaxAggregateOutputType | null
  }

  export type RolPermisoMinAggregateOutputType = {
    id: string | null
    rolId: string | null
    permisoId: string | null
    createAt: Date | null
  }

  export type RolPermisoMaxAggregateOutputType = {
    id: string | null
    rolId: string | null
    permisoId: string | null
    createAt: Date | null
  }

  export type RolPermisoCountAggregateOutputType = {
    id: number
    rolId: number
    permisoId: number
    createAt: number
    _all: number
  }


  export type RolPermisoMinAggregateInputType = {
    id?: true
    rolId?: true
    permisoId?: true
    createAt?: true
  }

  export type RolPermisoMaxAggregateInputType = {
    id?: true
    rolId?: true
    permisoId?: true
    createAt?: true
  }

  export type RolPermisoCountAggregateInputType = {
    id?: true
    rolId?: true
    permisoId?: true
    createAt?: true
    _all?: true
  }

  export type RolPermisoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolPermiso to aggregate.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolPermisos
    **/
    _count?: true | RolPermisoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolPermisoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolPermisoMaxAggregateInputType
  }

  export type GetRolPermisoAggregateType<T extends RolPermisoAggregateArgs> = {
        [P in keyof T & keyof AggregateRolPermiso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolPermiso[P]>
      : GetScalarType<T[P], AggregateRolPermiso[P]>
  }




  export type RolPermisoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithAggregationInput | RolPermisoOrderByWithAggregationInput[]
    by: RolPermisoScalarFieldEnum[] | RolPermisoScalarFieldEnum
    having?: RolPermisoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolPermisoCountAggregateInputType | true
    _min?: RolPermisoMinAggregateInputType
    _max?: RolPermisoMaxAggregateInputType
  }

  export type RolPermisoGroupByOutputType = {
    id: string
    rolId: string
    permisoId: string
    createAt: Date
    _count: RolPermisoCountAggregateOutputType | null
    _min: RolPermisoMinAggregateOutputType | null
    _max: RolPermisoMaxAggregateOutputType | null
  }

  type GetRolPermisoGroupByPayload<T extends RolPermisoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolPermisoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolPermisoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolPermisoGroupByOutputType[P]>
            : GetScalarType<T[P], RolPermisoGroupByOutputType[P]>
        }
      >
    >


  export type RolPermisoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rolId?: boolean
    permisoId?: boolean
    createAt?: boolean
    permiso?: boolean | PermisoDefaultArgs<ExtArgs>
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolPermiso"]>



  export type RolPermisoSelectScalar = {
    id?: boolean
    rolId?: boolean
    permisoId?: boolean
    createAt?: boolean
  }

  export type RolPermisoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rolId" | "permisoId" | "createAt", ExtArgs["result"]["rolPermiso"]>
  export type RolPermisoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permiso?: boolean | PermisoDefaultArgs<ExtArgs>
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }

  export type $RolPermisoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolPermiso"
    objects: {
      permiso: Prisma.$PermisoPayload<ExtArgs>
      rol: Prisma.$RolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rolId: string
      permisoId: string
      createAt: Date
    }, ExtArgs["result"]["rolPermiso"]>
    composites: {}
  }

  type RolPermisoGetPayload<S extends boolean | null | undefined | RolPermisoDefaultArgs> = $Result.GetResult<Prisma.$RolPermisoPayload, S>

  type RolPermisoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolPermisoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolPermisoCountAggregateInputType | true
    }

  export interface RolPermisoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolPermiso'], meta: { name: 'RolPermiso' } }
    /**
     * Find zero or one RolPermiso that matches the filter.
     * @param {RolPermisoFindUniqueArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolPermisoFindUniqueArgs>(args: SelectSubset<T, RolPermisoFindUniqueArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolPermiso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolPermisoFindUniqueOrThrowArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolPermisoFindUniqueOrThrowArgs>(args: SelectSubset<T, RolPermisoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolPermiso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindFirstArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolPermisoFindFirstArgs>(args?: SelectSubset<T, RolPermisoFindFirstArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolPermiso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindFirstOrThrowArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolPermisoFindFirstOrThrowArgs>(args?: SelectSubset<T, RolPermisoFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolPermisos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolPermisos
     * const rolPermisos = await prisma.rolPermiso.findMany()
     * 
     * // Get first 10 RolPermisos
     * const rolPermisos = await prisma.rolPermiso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolPermisoWithIdOnly = await prisma.rolPermiso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolPermisoFindManyArgs>(args?: SelectSubset<T, RolPermisoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolPermiso.
     * @param {RolPermisoCreateArgs} args - Arguments to create a RolPermiso.
     * @example
     * // Create one RolPermiso
     * const RolPermiso = await prisma.rolPermiso.create({
     *   data: {
     *     // ... data to create a RolPermiso
     *   }
     * })
     * 
     */
    create<T extends RolPermisoCreateArgs>(args: SelectSubset<T, RolPermisoCreateArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolPermisos.
     * @param {RolPermisoCreateManyArgs} args - Arguments to create many RolPermisos.
     * @example
     * // Create many RolPermisos
     * const rolPermiso = await prisma.rolPermiso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolPermisoCreateManyArgs>(args?: SelectSubset<T, RolPermisoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RolPermiso.
     * @param {RolPermisoDeleteArgs} args - Arguments to delete one RolPermiso.
     * @example
     * // Delete one RolPermiso
     * const RolPermiso = await prisma.rolPermiso.delete({
     *   where: {
     *     // ... filter to delete one RolPermiso
     *   }
     * })
     * 
     */
    delete<T extends RolPermisoDeleteArgs>(args: SelectSubset<T, RolPermisoDeleteArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolPermiso.
     * @param {RolPermisoUpdateArgs} args - Arguments to update one RolPermiso.
     * @example
     * // Update one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolPermisoUpdateArgs>(args: SelectSubset<T, RolPermisoUpdateArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolPermisos.
     * @param {RolPermisoDeleteManyArgs} args - Arguments to filter RolPermisos to delete.
     * @example
     * // Delete a few RolPermisos
     * const { count } = await prisma.rolPermiso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolPermisoDeleteManyArgs>(args?: SelectSubset<T, RolPermisoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolPermisos
     * const rolPermiso = await prisma.rolPermiso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolPermisoUpdateManyArgs>(args: SelectSubset<T, RolPermisoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RolPermiso.
     * @param {RolPermisoUpsertArgs} args - Arguments to update or create a RolPermiso.
     * @example
     * // Update or create a RolPermiso
     * const rolPermiso = await prisma.rolPermiso.upsert({
     *   create: {
     *     // ... data to create a RolPermiso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolPermiso we want to update
     *   }
     * })
     */
    upsert<T extends RolPermisoUpsertArgs>(args: SelectSubset<T, RolPermisoUpsertArgs<ExtArgs>>): Prisma__RolPermisoClient<$Result.GetResult<Prisma.$RolPermisoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoCountArgs} args - Arguments to filter RolPermisos to count.
     * @example
     * // Count the number of RolPermisos
     * const count = await prisma.rolPermiso.count({
     *   where: {
     *     // ... the filter for the RolPermisos we want to count
     *   }
     * })
    **/
    count<T extends RolPermisoCountArgs>(
      args?: Subset<T, RolPermisoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolPermisoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolPermisoAggregateArgs>(args: Subset<T, RolPermisoAggregateArgs>): Prisma.PrismaPromise<GetRolPermisoAggregateType<T>>

    /**
     * Group by RolPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolPermisoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolPermisoGroupByArgs['orderBy'] }
        : { orderBy?: RolPermisoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolPermisoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolPermisoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolPermiso model
   */
  readonly fields: RolPermisoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolPermiso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolPermisoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permiso<T extends PermisoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermisoDefaultArgs<ExtArgs>>): Prisma__PermisoClient<$Result.GetResult<Prisma.$PermisoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rol<T extends RolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolDefaultArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolPermiso model
   */
  interface RolPermisoFieldRefs {
    readonly id: FieldRef<"RolPermiso", 'String'>
    readonly rolId: FieldRef<"RolPermiso", 'String'>
    readonly permisoId: FieldRef<"RolPermiso", 'String'>
    readonly createAt: FieldRef<"RolPermiso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolPermiso findUnique
   */
  export type RolPermisoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where: RolPermisoWhereUniqueInput
  }

  /**
   * RolPermiso findUniqueOrThrow
   */
  export type RolPermisoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where: RolPermisoWhereUniqueInput
  }

  /**
   * RolPermiso findFirst
   */
  export type RolPermisoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolPermisos.
     */
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }

  /**
   * RolPermiso findFirstOrThrow
   */
  export type RolPermisoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolPermisos.
     */
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }

  /**
   * RolPermiso findMany
   */
  export type RolPermisoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermisos to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }

  /**
   * RolPermiso create
   */
  export type RolPermisoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The data needed to create a RolPermiso.
     */
    data: XOR<RolPermisoCreateInput, RolPermisoUncheckedCreateInput>
  }

  /**
   * RolPermiso createMany
   */
  export type RolPermisoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolPermisos.
     */
    data: RolPermisoCreateManyInput | RolPermisoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolPermiso update
   */
  export type RolPermisoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The data needed to update a RolPermiso.
     */
    data: XOR<RolPermisoUpdateInput, RolPermisoUncheckedUpdateInput>
    /**
     * Choose, which RolPermiso to update.
     */
    where: RolPermisoWhereUniqueInput
  }

  /**
   * RolPermiso updateMany
   */
  export type RolPermisoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolPermisos.
     */
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyInput>
    /**
     * Filter which RolPermisos to update
     */
    where?: RolPermisoWhereInput
    /**
     * Limit how many RolPermisos to update.
     */
    limit?: number
  }

  /**
   * RolPermiso upsert
   */
  export type RolPermisoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The filter to search for the RolPermiso to update in case it exists.
     */
    where: RolPermisoWhereUniqueInput
    /**
     * In case the RolPermiso found by the `where` argument doesn't exist, create a new RolPermiso with this data.
     */
    create: XOR<RolPermisoCreateInput, RolPermisoUncheckedCreateInput>
    /**
     * In case the RolPermiso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolPermisoUpdateInput, RolPermisoUncheckedUpdateInput>
  }

  /**
   * RolPermiso delete
   */
  export type RolPermisoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter which RolPermiso to delete.
     */
    where: RolPermisoWhereUniqueInput
  }

  /**
   * RolPermiso deleteMany
   */
  export type RolPermisoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolPermisos to delete
     */
    where?: RolPermisoWhereInput
    /**
     * Limit how many RolPermisos to delete.
     */
    limit?: number
  }

  /**
   * RolPermiso without action
   */
  export type RolPermisoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolPermiso
     */
    omit?: RolPermisoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolPermisoInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
    rolId: string | null
    DebeCambiar: boolean | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    createAt: Date | null
    updateAt: Date | null
    activo: boolean | null
    rolId: string | null
    DebeCambiar: boolean | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    password: number
    createAt: number
    updateAt: number
    activo: number
    rolId: number
    DebeCambiar: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    createAt?: true
    updateAt?: true
    activo?: true
    rolId?: true
    DebeCambiar?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    createAt?: true
    updateAt?: true
    activo?: true
    rolId?: true
    DebeCambiar?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    createAt?: true
    updateAt?: true
    activo?: true
    rolId?: true
    DebeCambiar?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nombre: string
    email: string
    password: string
    createAt: Date
    updateAt: Date
    activo: boolean
    rolId: string
    DebeCambiar: boolean
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    rolId?: boolean
    DebeCambiar?: boolean
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    createAt?: boolean
    updateAt?: boolean
    activo?: boolean
    rolId?: boolean
    DebeCambiar?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "password" | "createAt" | "updateAt" | "activo" | "rolId" | "DebeCambiar", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      rol: Prisma.$RolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string
      password: string
      createAt: Date
      updateAt: Date
      activo: boolean
      rolId: string
      DebeCambiar: boolean
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rol<T extends RolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolDefaultArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly createAt: FieldRef<"Usuario", 'DateTime'>
    readonly updateAt: FieldRef<"Usuario", 'DateTime'>
    readonly activo: FieldRef<"Usuario", 'Boolean'>
    readonly rolId: FieldRef<"Usuario", 'String'>
    readonly DebeCambiar: FieldRef<"Usuario", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RolScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type RolScalarFieldEnum = (typeof RolScalarFieldEnum)[keyof typeof RolScalarFieldEnum]


  export const InquilinoScalarFieldEnum: {
    id: 'id',
    nombreCompleto: 'nombreCompleto',
    dni: 'dni',
    numero: 'numero',
    correo: 'correo',
    fechaNacimiento: 'fechaNacimiento',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type InquilinoScalarFieldEnum = (typeof InquilinoScalarFieldEnum)[keyof typeof InquilinoScalarFieldEnum]


  export const AcompañanteScalarFieldEnum: {
    id: 'id',
    nombreCompleto: 'nombreCompleto',
    inquilinoId: 'inquilinoId',
    Parentesco: 'Parentesco',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type AcompañanteScalarFieldEnum = (typeof AcompañanteScalarFieldEnum)[keyof typeof AcompañanteScalarFieldEnum]


  export const ApartamentoScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    direccion: 'direccion',
    createAt: 'createAt',
    updateAt: 'updateAt',
    disponible: 'disponible',
    activo: 'activo'
  };

  export type ApartamentoScalarFieldEnum = (typeof ApartamentoScalarFieldEnum)[keyof typeof ApartamentoScalarFieldEnum]


  export const TiposHabitacionScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type TiposHabitacionScalarFieldEnum = (typeof TiposHabitacionScalarFieldEnum)[keyof typeof TiposHabitacionScalarFieldEnum]


  export const HabitacionesScalarFieldEnum: {
    id: 'id',
    apartamentoId: 'apartamentoId',
    tipoHabitacionId: 'tipoHabitacionId',
    cantidad: 'cantidad',
    createAt: 'createAt',
    activo: 'activo',
    updateAt: 'updateAt'
  };

  export type HabitacionesScalarFieldEnum = (typeof HabitacionesScalarFieldEnum)[keyof typeof HabitacionesScalarFieldEnum]


  export const ServiciosScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type ServiciosScalarFieldEnum = (typeof ServiciosScalarFieldEnum)[keyof typeof ServiciosScalarFieldEnum]


  export const ApartamentoServiciosScalarFieldEnum: {
    id: 'id',
    apartamentoId: 'apartamentoId',
    servicioId: 'servicioId',
    incluido: 'incluido',
    costoAdicional: 'costoAdicional',
    createAt: 'createAt',
    updateAt: 'updateAt'
  };

  export type ApartamentoServiciosScalarFieldEnum = (typeof ApartamentoServiciosScalarFieldEnum)[keyof typeof ApartamentoServiciosScalarFieldEnum]


  export const ContratosScalarFieldEnum: {
    id: 'id',
    inquilinoId: 'inquilinoId',
    apartamentoId: 'apartamentoId',
    fechaInicio: 'fechaInicio',
    fechaFin: 'fechaFin',
    createAt: 'createAt',
    updateAt: 'updateAt',
    montoMensual: 'montoMensual',
    activo: 'activo'
  };

  export type ContratosScalarFieldEnum = (typeof ContratosScalarFieldEnum)[keyof typeof ContratosScalarFieldEnum]


  export const RecibosScalarFieldEnum: {
    id: 'id',
    contratoId: 'contratoId',
    fechaPago: 'fechaPago',
    total: 'total',
    createAt: 'createAt',
    updateAt: 'updateAt'
  };

  export type RecibosScalarFieldEnum = (typeof RecibosScalarFieldEnum)[keyof typeof RecibosScalarFieldEnum]


  export const ReciboDetallesScalarFieldEnum: {
    id: 'id',
    reciboId: 'reciboId',
    descripcion: 'descripcion',
    monto: 'monto',
    createAt: 'createAt',
    updateAt: 'updateAt'
  };

  export type ReciboDetallesScalarFieldEnum = (typeof ReciboDetallesScalarFieldEnum)[keyof typeof ReciboDetallesScalarFieldEnum]


  export const PermisoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo'
  };

  export type PermisoScalarFieldEnum = (typeof PermisoScalarFieldEnum)[keyof typeof PermisoScalarFieldEnum]


  export const RolPermisoScalarFieldEnum: {
    id: 'id',
    rolId: 'rolId',
    permisoId: 'permisoId',
    createAt: 'createAt'
  };

  export type RolPermisoScalarFieldEnum = (typeof RolPermisoScalarFieldEnum)[keyof typeof RolPermisoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    createAt: 'createAt',
    updateAt: 'updateAt',
    activo: 'activo',
    rolId: 'rolId',
    DebeCambiar: 'DebeCambiar'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const RolOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion'
  };

  export type RolOrderByRelevanceFieldEnum = (typeof RolOrderByRelevanceFieldEnum)[keyof typeof RolOrderByRelevanceFieldEnum]


  export const InquilinoOrderByRelevanceFieldEnum: {
    id: 'id',
    nombreCompleto: 'nombreCompleto',
    dni: 'dni',
    numero: 'numero',
    correo: 'correo'
  };

  export type InquilinoOrderByRelevanceFieldEnum = (typeof InquilinoOrderByRelevanceFieldEnum)[keyof typeof InquilinoOrderByRelevanceFieldEnum]


  export const AcompañanteOrderByRelevanceFieldEnum: {
    id: 'id',
    nombreCompleto: 'nombreCompleto',
    inquilinoId: 'inquilinoId',
    Parentesco: 'Parentesco'
  };

  export type AcompañanteOrderByRelevanceFieldEnum = (typeof AcompañanteOrderByRelevanceFieldEnum)[keyof typeof AcompañanteOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ApartamentoOrderByRelevanceFieldEnum: {
    id: 'id',
    numero: 'numero',
    direccion: 'direccion'
  };

  export type ApartamentoOrderByRelevanceFieldEnum = (typeof ApartamentoOrderByRelevanceFieldEnum)[keyof typeof ApartamentoOrderByRelevanceFieldEnum]


  export const TiposHabitacionOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type TiposHabitacionOrderByRelevanceFieldEnum = (typeof TiposHabitacionOrderByRelevanceFieldEnum)[keyof typeof TiposHabitacionOrderByRelevanceFieldEnum]


  export const HabitacionesOrderByRelevanceFieldEnum: {
    id: 'id',
    apartamentoId: 'apartamentoId',
    tipoHabitacionId: 'tipoHabitacionId'
  };

  export type HabitacionesOrderByRelevanceFieldEnum = (typeof HabitacionesOrderByRelevanceFieldEnum)[keyof typeof HabitacionesOrderByRelevanceFieldEnum]


  export const ServiciosOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type ServiciosOrderByRelevanceFieldEnum = (typeof ServiciosOrderByRelevanceFieldEnum)[keyof typeof ServiciosOrderByRelevanceFieldEnum]


  export const ApartamentoServiciosOrderByRelevanceFieldEnum: {
    id: 'id',
    apartamentoId: 'apartamentoId',
    servicioId: 'servicioId'
  };

  export type ApartamentoServiciosOrderByRelevanceFieldEnum = (typeof ApartamentoServiciosOrderByRelevanceFieldEnum)[keyof typeof ApartamentoServiciosOrderByRelevanceFieldEnum]


  export const ContratosOrderByRelevanceFieldEnum: {
    id: 'id',
    inquilinoId: 'inquilinoId',
    apartamentoId: 'apartamentoId'
  };

  export type ContratosOrderByRelevanceFieldEnum = (typeof ContratosOrderByRelevanceFieldEnum)[keyof typeof ContratosOrderByRelevanceFieldEnum]


  export const RecibosOrderByRelevanceFieldEnum: {
    id: 'id',
    contratoId: 'contratoId'
  };

  export type RecibosOrderByRelevanceFieldEnum = (typeof RecibosOrderByRelevanceFieldEnum)[keyof typeof RecibosOrderByRelevanceFieldEnum]


  export const ReciboDetallesOrderByRelevanceFieldEnum: {
    id: 'id',
    reciboId: 'reciboId',
    descripcion: 'descripcion'
  };

  export type ReciboDetallesOrderByRelevanceFieldEnum = (typeof ReciboDetallesOrderByRelevanceFieldEnum)[keyof typeof ReciboDetallesOrderByRelevanceFieldEnum]


  export const PermisoOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion'
  };

  export type PermisoOrderByRelevanceFieldEnum = (typeof PermisoOrderByRelevanceFieldEnum)[keyof typeof PermisoOrderByRelevanceFieldEnum]


  export const RolPermisoOrderByRelevanceFieldEnum: {
    id: 'id',
    rolId: 'rolId',
    permisoId: 'permisoId'
  };

  export type RolPermisoOrderByRelevanceFieldEnum = (typeof RolPermisoOrderByRelevanceFieldEnum)[keyof typeof RolPermisoOrderByRelevanceFieldEnum]


  export const UsuarioOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    rolId: 'rolId'
  };

  export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type RolWhereInput = {
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    id?: StringFilter<"Rol"> | string
    nombre?: StringFilter<"Rol"> | string
    descripcion?: StringFilter<"Rol"> | string
    createAt?: DateTimeFilter<"Rol"> | Date | string
    updateAt?: DateTimeFilter<"Rol"> | Date | string
    activo?: BoolFilter<"Rol"> | boolean
    permisos?: RolPermisoListRelationFilter
    Usuario?: UsuarioListRelationFilter
  }

  export type RolOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    permisos?: RolPermisoOrderByRelationAggregateInput
    Usuario?: UsuarioOrderByRelationAggregateInput
    _relevance?: RolOrderByRelevanceInput
  }

  export type RolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    descripcion?: StringFilter<"Rol"> | string
    createAt?: DateTimeFilter<"Rol"> | Date | string
    updateAt?: DateTimeFilter<"Rol"> | Date | string
    activo?: BoolFilter<"Rol"> | boolean
    permisos?: RolPermisoListRelationFilter
    Usuario?: UsuarioListRelationFilter
  }, "id" | "nombre">

  export type RolOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: RolCountOrderByAggregateInput
    _max?: RolMaxOrderByAggregateInput
    _min?: RolMinOrderByAggregateInput
  }

  export type RolScalarWhereWithAggregatesInput = {
    AND?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    OR?: RolScalarWhereWithAggregatesInput[]
    NOT?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rol"> | string
    nombre?: StringWithAggregatesFilter<"Rol"> | string
    descripcion?: StringWithAggregatesFilter<"Rol"> | string
    createAt?: DateTimeWithAggregatesFilter<"Rol"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Rol"> | Date | string
    activo?: BoolWithAggregatesFilter<"Rol"> | boolean
  }

  export type InquilinoWhereInput = {
    AND?: InquilinoWhereInput | InquilinoWhereInput[]
    OR?: InquilinoWhereInput[]
    NOT?: InquilinoWhereInput | InquilinoWhereInput[]
    id?: StringFilter<"Inquilino"> | string
    nombreCompleto?: StringFilter<"Inquilino"> | string
    dni?: StringFilter<"Inquilino"> | string
    numero?: StringFilter<"Inquilino"> | string
    correo?: StringFilter<"Inquilino"> | string
    fechaNacimiento?: DateTimeFilter<"Inquilino"> | Date | string
    createAt?: DateTimeFilter<"Inquilino"> | Date | string
    updateAt?: DateTimeFilter<"Inquilino"> | Date | string
    activo?: BoolFilter<"Inquilino"> | boolean
    Acompañante?: AcompañanteListRelationFilter
    Contratos?: ContratosListRelationFilter
  }

  export type InquilinoOrderByWithRelationInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    dni?: SortOrder
    numero?: SortOrder
    correo?: SortOrder
    fechaNacimiento?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    Acompañante?: AcompañanteOrderByRelationAggregateInput
    Contratos?: ContratosOrderByRelationAggregateInput
    _relevance?: InquilinoOrderByRelevanceInput
  }

  export type InquilinoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InquilinoWhereInput | InquilinoWhereInput[]
    OR?: InquilinoWhereInput[]
    NOT?: InquilinoWhereInput | InquilinoWhereInput[]
    nombreCompleto?: StringFilter<"Inquilino"> | string
    dni?: StringFilter<"Inquilino"> | string
    numero?: StringFilter<"Inquilino"> | string
    correo?: StringFilter<"Inquilino"> | string
    fechaNacimiento?: DateTimeFilter<"Inquilino"> | Date | string
    createAt?: DateTimeFilter<"Inquilino"> | Date | string
    updateAt?: DateTimeFilter<"Inquilino"> | Date | string
    activo?: BoolFilter<"Inquilino"> | boolean
    Acompañante?: AcompañanteListRelationFilter
    Contratos?: ContratosListRelationFilter
  }, "id">

  export type InquilinoOrderByWithAggregationInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    dni?: SortOrder
    numero?: SortOrder
    correo?: SortOrder
    fechaNacimiento?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: InquilinoCountOrderByAggregateInput
    _max?: InquilinoMaxOrderByAggregateInput
    _min?: InquilinoMinOrderByAggregateInput
  }

  export type InquilinoScalarWhereWithAggregatesInput = {
    AND?: InquilinoScalarWhereWithAggregatesInput | InquilinoScalarWhereWithAggregatesInput[]
    OR?: InquilinoScalarWhereWithAggregatesInput[]
    NOT?: InquilinoScalarWhereWithAggregatesInput | InquilinoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inquilino"> | string
    nombreCompleto?: StringWithAggregatesFilter<"Inquilino"> | string
    dni?: StringWithAggregatesFilter<"Inquilino"> | string
    numero?: StringWithAggregatesFilter<"Inquilino"> | string
    correo?: StringWithAggregatesFilter<"Inquilino"> | string
    fechaNacimiento?: DateTimeWithAggregatesFilter<"Inquilino"> | Date | string
    createAt?: DateTimeWithAggregatesFilter<"Inquilino"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Inquilino"> | Date | string
    activo?: BoolWithAggregatesFilter<"Inquilino"> | boolean
  }

  export type AcompañanteWhereInput = {
    AND?: AcompañanteWhereInput | AcompañanteWhereInput[]
    OR?: AcompañanteWhereInput[]
    NOT?: AcompañanteWhereInput | AcompañanteWhereInput[]
    id?: StringFilter<"Acompañante"> | string
    nombreCompleto?: StringFilter<"Acompañante"> | string
    inquilinoId?: StringFilter<"Acompañante"> | string
    Parentesco?: StringFilter<"Acompañante"> | string
    createAt?: DateTimeFilter<"Acompañante"> | Date | string
    updateAt?: DateTimeFilter<"Acompañante"> | Date | string
    activo?: BoolFilter<"Acompañante"> | boolean
    inquilino?: XOR<InquilinoScalarRelationFilter, InquilinoWhereInput>
  }

  export type AcompañanteOrderByWithRelationInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    inquilinoId?: SortOrder
    Parentesco?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    inquilino?: InquilinoOrderByWithRelationInput
    _relevance?: AcompañanteOrderByRelevanceInput
  }

  export type AcompañanteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AcompañanteWhereInput | AcompañanteWhereInput[]
    OR?: AcompañanteWhereInput[]
    NOT?: AcompañanteWhereInput | AcompañanteWhereInput[]
    nombreCompleto?: StringFilter<"Acompañante"> | string
    inquilinoId?: StringFilter<"Acompañante"> | string
    Parentesco?: StringFilter<"Acompañante"> | string
    createAt?: DateTimeFilter<"Acompañante"> | Date | string
    updateAt?: DateTimeFilter<"Acompañante"> | Date | string
    activo?: BoolFilter<"Acompañante"> | boolean
    inquilino?: XOR<InquilinoScalarRelationFilter, InquilinoWhereInput>
  }, "id">

  export type AcompañanteOrderByWithAggregationInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    inquilinoId?: SortOrder
    Parentesco?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: AcompañanteCountOrderByAggregateInput
    _max?: AcompañanteMaxOrderByAggregateInput
    _min?: AcompañanteMinOrderByAggregateInput
  }

  export type AcompañanteScalarWhereWithAggregatesInput = {
    AND?: AcompañanteScalarWhereWithAggregatesInput | AcompañanteScalarWhereWithAggregatesInput[]
    OR?: AcompañanteScalarWhereWithAggregatesInput[]
    NOT?: AcompañanteScalarWhereWithAggregatesInput | AcompañanteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Acompañante"> | string
    nombreCompleto?: StringWithAggregatesFilter<"Acompañante"> | string
    inquilinoId?: StringWithAggregatesFilter<"Acompañante"> | string
    Parentesco?: StringWithAggregatesFilter<"Acompañante"> | string
    createAt?: DateTimeWithAggregatesFilter<"Acompañante"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Acompañante"> | Date | string
    activo?: BoolWithAggregatesFilter<"Acompañante"> | boolean
  }

  export type ApartamentoWhereInput = {
    AND?: ApartamentoWhereInput | ApartamentoWhereInput[]
    OR?: ApartamentoWhereInput[]
    NOT?: ApartamentoWhereInput | ApartamentoWhereInput[]
    id?: StringFilter<"Apartamento"> | string
    numero?: StringFilter<"Apartamento"> | string
    direccion?: StringNullableFilter<"Apartamento"> | string | null
    createAt?: DateTimeFilter<"Apartamento"> | Date | string
    updateAt?: DateTimeFilter<"Apartamento"> | Date | string
    disponible?: BoolFilter<"Apartamento"> | boolean
    activo?: BoolFilter<"Apartamento"> | boolean
    apartamento?: HabitacionesListRelationFilter
    ApartamentoServicios?: ApartamentoServiciosListRelationFilter
    Contratos?: ContratosListRelationFilter
  }

  export type ApartamentoOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    direccion?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    disponible?: SortOrder
    activo?: SortOrder
    apartamento?: HabitacionesOrderByRelationAggregateInput
    ApartamentoServicios?: ApartamentoServiciosOrderByRelationAggregateInput
    Contratos?: ContratosOrderByRelationAggregateInput
    _relevance?: ApartamentoOrderByRelevanceInput
  }

  export type ApartamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: ApartamentoWhereInput | ApartamentoWhereInput[]
    OR?: ApartamentoWhereInput[]
    NOT?: ApartamentoWhereInput | ApartamentoWhereInput[]
    direccion?: StringNullableFilter<"Apartamento"> | string | null
    createAt?: DateTimeFilter<"Apartamento"> | Date | string
    updateAt?: DateTimeFilter<"Apartamento"> | Date | string
    disponible?: BoolFilter<"Apartamento"> | boolean
    activo?: BoolFilter<"Apartamento"> | boolean
    apartamento?: HabitacionesListRelationFilter
    ApartamentoServicios?: ApartamentoServiciosListRelationFilter
    Contratos?: ContratosListRelationFilter
  }, "id" | "numero">

  export type ApartamentoOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    direccion?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    disponible?: SortOrder
    activo?: SortOrder
    _count?: ApartamentoCountOrderByAggregateInput
    _max?: ApartamentoMaxOrderByAggregateInput
    _min?: ApartamentoMinOrderByAggregateInput
  }

  export type ApartamentoScalarWhereWithAggregatesInput = {
    AND?: ApartamentoScalarWhereWithAggregatesInput | ApartamentoScalarWhereWithAggregatesInput[]
    OR?: ApartamentoScalarWhereWithAggregatesInput[]
    NOT?: ApartamentoScalarWhereWithAggregatesInput | ApartamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Apartamento"> | string
    numero?: StringWithAggregatesFilter<"Apartamento"> | string
    direccion?: StringNullableWithAggregatesFilter<"Apartamento"> | string | null
    createAt?: DateTimeWithAggregatesFilter<"Apartamento"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Apartamento"> | Date | string
    disponible?: BoolWithAggregatesFilter<"Apartamento"> | boolean
    activo?: BoolWithAggregatesFilter<"Apartamento"> | boolean
  }

  export type TiposHabitacionWhereInput = {
    AND?: TiposHabitacionWhereInput | TiposHabitacionWhereInput[]
    OR?: TiposHabitacionWhereInput[]
    NOT?: TiposHabitacionWhereInput | TiposHabitacionWhereInput[]
    id?: StringFilter<"TiposHabitacion"> | string
    nombre?: StringFilter<"TiposHabitacion"> | string
    createAt?: DateTimeFilter<"TiposHabitacion"> | Date | string
    updateAt?: DateTimeFilter<"TiposHabitacion"> | Date | string
    activo?: BoolFilter<"TiposHabitacion"> | boolean
    apartamento?: HabitacionesListRelationFilter
  }

  export type TiposHabitacionOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    apartamento?: HabitacionesOrderByRelationAggregateInput
    _relevance?: TiposHabitacionOrderByRelevanceInput
  }

  export type TiposHabitacionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: TiposHabitacionWhereInput | TiposHabitacionWhereInput[]
    OR?: TiposHabitacionWhereInput[]
    NOT?: TiposHabitacionWhereInput | TiposHabitacionWhereInput[]
    createAt?: DateTimeFilter<"TiposHabitacion"> | Date | string
    updateAt?: DateTimeFilter<"TiposHabitacion"> | Date | string
    activo?: BoolFilter<"TiposHabitacion"> | boolean
    apartamento?: HabitacionesListRelationFilter
  }, "id" | "nombre">

  export type TiposHabitacionOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: TiposHabitacionCountOrderByAggregateInput
    _max?: TiposHabitacionMaxOrderByAggregateInput
    _min?: TiposHabitacionMinOrderByAggregateInput
  }

  export type TiposHabitacionScalarWhereWithAggregatesInput = {
    AND?: TiposHabitacionScalarWhereWithAggregatesInput | TiposHabitacionScalarWhereWithAggregatesInput[]
    OR?: TiposHabitacionScalarWhereWithAggregatesInput[]
    NOT?: TiposHabitacionScalarWhereWithAggregatesInput | TiposHabitacionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TiposHabitacion"> | string
    nombre?: StringWithAggregatesFilter<"TiposHabitacion"> | string
    createAt?: DateTimeWithAggregatesFilter<"TiposHabitacion"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"TiposHabitacion"> | Date | string
    activo?: BoolWithAggregatesFilter<"TiposHabitacion"> | boolean
  }

  export type HabitacionesWhereInput = {
    AND?: HabitacionesWhereInput | HabitacionesWhereInput[]
    OR?: HabitacionesWhereInput[]
    NOT?: HabitacionesWhereInput | HabitacionesWhereInput[]
    id?: StringFilter<"Habitaciones"> | string
    apartamentoId?: StringFilter<"Habitaciones"> | string
    tipoHabitacionId?: StringFilter<"Habitaciones"> | string
    cantidad?: IntFilter<"Habitaciones"> | number
    createAt?: DateTimeFilter<"Habitaciones"> | Date | string
    activo?: BoolFilter<"Habitaciones"> | boolean
    updateAt?: DateTimeFilter<"Habitaciones"> | Date | string
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    tipoHabitacion?: XOR<TiposHabitacionScalarRelationFilter, TiposHabitacionWhereInput>
  }

  export type HabitacionesOrderByWithRelationInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    tipoHabitacionId?: SortOrder
    cantidad?: SortOrder
    createAt?: SortOrder
    activo?: SortOrder
    updateAt?: SortOrder
    apartamento?: ApartamentoOrderByWithRelationInput
    tipoHabitacion?: TiposHabitacionOrderByWithRelationInput
    _relevance?: HabitacionesOrderByRelevanceInput
  }

  export type HabitacionesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HabitacionesWhereInput | HabitacionesWhereInput[]
    OR?: HabitacionesWhereInput[]
    NOT?: HabitacionesWhereInput | HabitacionesWhereInput[]
    apartamentoId?: StringFilter<"Habitaciones"> | string
    tipoHabitacionId?: StringFilter<"Habitaciones"> | string
    cantidad?: IntFilter<"Habitaciones"> | number
    createAt?: DateTimeFilter<"Habitaciones"> | Date | string
    activo?: BoolFilter<"Habitaciones"> | boolean
    updateAt?: DateTimeFilter<"Habitaciones"> | Date | string
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    tipoHabitacion?: XOR<TiposHabitacionScalarRelationFilter, TiposHabitacionWhereInput>
  }, "id">

  export type HabitacionesOrderByWithAggregationInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    tipoHabitacionId?: SortOrder
    cantidad?: SortOrder
    createAt?: SortOrder
    activo?: SortOrder
    updateAt?: SortOrder
    _count?: HabitacionesCountOrderByAggregateInput
    _avg?: HabitacionesAvgOrderByAggregateInput
    _max?: HabitacionesMaxOrderByAggregateInput
    _min?: HabitacionesMinOrderByAggregateInput
    _sum?: HabitacionesSumOrderByAggregateInput
  }

  export type HabitacionesScalarWhereWithAggregatesInput = {
    AND?: HabitacionesScalarWhereWithAggregatesInput | HabitacionesScalarWhereWithAggregatesInput[]
    OR?: HabitacionesScalarWhereWithAggregatesInput[]
    NOT?: HabitacionesScalarWhereWithAggregatesInput | HabitacionesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Habitaciones"> | string
    apartamentoId?: StringWithAggregatesFilter<"Habitaciones"> | string
    tipoHabitacionId?: StringWithAggregatesFilter<"Habitaciones"> | string
    cantidad?: IntWithAggregatesFilter<"Habitaciones"> | number
    createAt?: DateTimeWithAggregatesFilter<"Habitaciones"> | Date | string
    activo?: BoolWithAggregatesFilter<"Habitaciones"> | boolean
    updateAt?: DateTimeWithAggregatesFilter<"Habitaciones"> | Date | string
  }

  export type ServiciosWhereInput = {
    AND?: ServiciosWhereInput | ServiciosWhereInput[]
    OR?: ServiciosWhereInput[]
    NOT?: ServiciosWhereInput | ServiciosWhereInput[]
    id?: StringFilter<"Servicios"> | string
    nombre?: StringFilter<"Servicios"> | string
    createAt?: DateTimeFilter<"Servicios"> | Date | string
    updateAt?: DateTimeFilter<"Servicios"> | Date | string
    activo?: BoolFilter<"Servicios"> | boolean
    ApartamentoServicios?: ApartamentoServiciosListRelationFilter
  }

  export type ServiciosOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    ApartamentoServicios?: ApartamentoServiciosOrderByRelationAggregateInput
    _relevance?: ServiciosOrderByRelevanceInput
  }

  export type ServiciosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: ServiciosWhereInput | ServiciosWhereInput[]
    OR?: ServiciosWhereInput[]
    NOT?: ServiciosWhereInput | ServiciosWhereInput[]
    createAt?: DateTimeFilter<"Servicios"> | Date | string
    updateAt?: DateTimeFilter<"Servicios"> | Date | string
    activo?: BoolFilter<"Servicios"> | boolean
    ApartamentoServicios?: ApartamentoServiciosListRelationFilter
  }, "id" | "nombre">

  export type ServiciosOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: ServiciosCountOrderByAggregateInput
    _max?: ServiciosMaxOrderByAggregateInput
    _min?: ServiciosMinOrderByAggregateInput
  }

  export type ServiciosScalarWhereWithAggregatesInput = {
    AND?: ServiciosScalarWhereWithAggregatesInput | ServiciosScalarWhereWithAggregatesInput[]
    OR?: ServiciosScalarWhereWithAggregatesInput[]
    NOT?: ServiciosScalarWhereWithAggregatesInput | ServiciosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Servicios"> | string
    nombre?: StringWithAggregatesFilter<"Servicios"> | string
    createAt?: DateTimeWithAggregatesFilter<"Servicios"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Servicios"> | Date | string
    activo?: BoolWithAggregatesFilter<"Servicios"> | boolean
  }

  export type ApartamentoServiciosWhereInput = {
    AND?: ApartamentoServiciosWhereInput | ApartamentoServiciosWhereInput[]
    OR?: ApartamentoServiciosWhereInput[]
    NOT?: ApartamentoServiciosWhereInput | ApartamentoServiciosWhereInput[]
    id?: StringFilter<"ApartamentoServicios"> | string
    apartamentoId?: StringFilter<"ApartamentoServicios"> | string
    servicioId?: StringFilter<"ApartamentoServicios"> | string
    incluido?: BoolFilter<"ApartamentoServicios"> | boolean
    costoAdicional?: DecimalFilter<"ApartamentoServicios"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
    updateAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    servicio?: XOR<ServiciosScalarRelationFilter, ServiciosWhereInput>
  }

  export type ApartamentoServiciosOrderByWithRelationInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    servicioId?: SortOrder
    incluido?: SortOrder
    costoAdicional?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    apartamento?: ApartamentoOrderByWithRelationInput
    servicio?: ServiciosOrderByWithRelationInput
    _relevance?: ApartamentoServiciosOrderByRelevanceInput
  }

  export type ApartamentoServiciosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApartamentoServiciosWhereInput | ApartamentoServiciosWhereInput[]
    OR?: ApartamentoServiciosWhereInput[]
    NOT?: ApartamentoServiciosWhereInput | ApartamentoServiciosWhereInput[]
    apartamentoId?: StringFilter<"ApartamentoServicios"> | string
    servicioId?: StringFilter<"ApartamentoServicios"> | string
    incluido?: BoolFilter<"ApartamentoServicios"> | boolean
    costoAdicional?: DecimalFilter<"ApartamentoServicios"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
    updateAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    servicio?: XOR<ServiciosScalarRelationFilter, ServiciosWhereInput>
  }, "id">

  export type ApartamentoServiciosOrderByWithAggregationInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    servicioId?: SortOrder
    incluido?: SortOrder
    costoAdicional?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _count?: ApartamentoServiciosCountOrderByAggregateInput
    _avg?: ApartamentoServiciosAvgOrderByAggregateInput
    _max?: ApartamentoServiciosMaxOrderByAggregateInput
    _min?: ApartamentoServiciosMinOrderByAggregateInput
    _sum?: ApartamentoServiciosSumOrderByAggregateInput
  }

  export type ApartamentoServiciosScalarWhereWithAggregatesInput = {
    AND?: ApartamentoServiciosScalarWhereWithAggregatesInput | ApartamentoServiciosScalarWhereWithAggregatesInput[]
    OR?: ApartamentoServiciosScalarWhereWithAggregatesInput[]
    NOT?: ApartamentoServiciosScalarWhereWithAggregatesInput | ApartamentoServiciosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApartamentoServicios"> | string
    apartamentoId?: StringWithAggregatesFilter<"ApartamentoServicios"> | string
    servicioId?: StringWithAggregatesFilter<"ApartamentoServicios"> | string
    incluido?: BoolWithAggregatesFilter<"ApartamentoServicios"> | boolean
    costoAdicional?: DecimalWithAggregatesFilter<"ApartamentoServicios"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeWithAggregatesFilter<"ApartamentoServicios"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"ApartamentoServicios"> | Date | string
  }

  export type ContratosWhereInput = {
    AND?: ContratosWhereInput | ContratosWhereInput[]
    OR?: ContratosWhereInput[]
    NOT?: ContratosWhereInput | ContratosWhereInput[]
    id?: StringFilter<"Contratos"> | string
    inquilinoId?: StringFilter<"Contratos"> | string
    apartamentoId?: StringFilter<"Contratos"> | string
    fechaInicio?: DateTimeFilter<"Contratos"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Contratos"> | Date | string | null
    createAt?: DateTimeFilter<"Contratos"> | Date | string
    updateAt?: DateTimeFilter<"Contratos"> | Date | string
    montoMensual?: DecimalFilter<"Contratos"> | Decimal | DecimalJsLike | number | string
    activo?: BoolFilter<"Contratos"> | boolean
    inquilino?: XOR<InquilinoScalarRelationFilter, InquilinoWhereInput>
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    recibos?: RecibosListRelationFilter
  }

  export type ContratosOrderByWithRelationInput = {
    id?: SortOrder
    inquilinoId?: SortOrder
    apartamentoId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    montoMensual?: SortOrder
    activo?: SortOrder
    inquilino?: InquilinoOrderByWithRelationInput
    apartamento?: ApartamentoOrderByWithRelationInput
    recibos?: RecibosOrderByRelationAggregateInput
    _relevance?: ContratosOrderByRelevanceInput
  }

  export type ContratosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContratosWhereInput | ContratosWhereInput[]
    OR?: ContratosWhereInput[]
    NOT?: ContratosWhereInput | ContratosWhereInput[]
    inquilinoId?: StringFilter<"Contratos"> | string
    apartamentoId?: StringFilter<"Contratos"> | string
    fechaInicio?: DateTimeFilter<"Contratos"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Contratos"> | Date | string | null
    createAt?: DateTimeFilter<"Contratos"> | Date | string
    updateAt?: DateTimeFilter<"Contratos"> | Date | string
    montoMensual?: DecimalFilter<"Contratos"> | Decimal | DecimalJsLike | number | string
    activo?: BoolFilter<"Contratos"> | boolean
    inquilino?: XOR<InquilinoScalarRelationFilter, InquilinoWhereInput>
    apartamento?: XOR<ApartamentoScalarRelationFilter, ApartamentoWhereInput>
    recibos?: RecibosListRelationFilter
  }, "id">

  export type ContratosOrderByWithAggregationInput = {
    id?: SortOrder
    inquilinoId?: SortOrder
    apartamentoId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    montoMensual?: SortOrder
    activo?: SortOrder
    _count?: ContratosCountOrderByAggregateInput
    _avg?: ContratosAvgOrderByAggregateInput
    _max?: ContratosMaxOrderByAggregateInput
    _min?: ContratosMinOrderByAggregateInput
    _sum?: ContratosSumOrderByAggregateInput
  }

  export type ContratosScalarWhereWithAggregatesInput = {
    AND?: ContratosScalarWhereWithAggregatesInput | ContratosScalarWhereWithAggregatesInput[]
    OR?: ContratosScalarWhereWithAggregatesInput[]
    NOT?: ContratosScalarWhereWithAggregatesInput | ContratosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contratos"> | string
    inquilinoId?: StringWithAggregatesFilter<"Contratos"> | string
    apartamentoId?: StringWithAggregatesFilter<"Contratos"> | string
    fechaInicio?: DateTimeWithAggregatesFilter<"Contratos"> | Date | string
    fechaFin?: DateTimeNullableWithAggregatesFilter<"Contratos"> | Date | string | null
    createAt?: DateTimeWithAggregatesFilter<"Contratos"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Contratos"> | Date | string
    montoMensual?: DecimalWithAggregatesFilter<"Contratos"> | Decimal | DecimalJsLike | number | string
    activo?: BoolWithAggregatesFilter<"Contratos"> | boolean
  }

  export type RecibosWhereInput = {
    AND?: RecibosWhereInput | RecibosWhereInput[]
    OR?: RecibosWhereInput[]
    NOT?: RecibosWhereInput | RecibosWhereInput[]
    id?: StringFilter<"Recibos"> | string
    contratoId?: StringFilter<"Recibos"> | string
    fechaPago?: DateTimeFilter<"Recibos"> | Date | string
    total?: DecimalFilter<"Recibos"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"Recibos"> | Date | string
    updateAt?: DateTimeFilter<"Recibos"> | Date | string
    contrato?: XOR<ContratosScalarRelationFilter, ContratosWhereInput>
    detalles?: ReciboDetallesListRelationFilter
  }

  export type RecibosOrderByWithRelationInput = {
    id?: SortOrder
    contratoId?: SortOrder
    fechaPago?: SortOrder
    total?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    contrato?: ContratosOrderByWithRelationInput
    detalles?: ReciboDetallesOrderByRelationAggregateInput
    _relevance?: RecibosOrderByRelevanceInput
  }

  export type RecibosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecibosWhereInput | RecibosWhereInput[]
    OR?: RecibosWhereInput[]
    NOT?: RecibosWhereInput | RecibosWhereInput[]
    contratoId?: StringFilter<"Recibos"> | string
    fechaPago?: DateTimeFilter<"Recibos"> | Date | string
    total?: DecimalFilter<"Recibos"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"Recibos"> | Date | string
    updateAt?: DateTimeFilter<"Recibos"> | Date | string
    contrato?: XOR<ContratosScalarRelationFilter, ContratosWhereInput>
    detalles?: ReciboDetallesListRelationFilter
  }, "id">

  export type RecibosOrderByWithAggregationInput = {
    id?: SortOrder
    contratoId?: SortOrder
    fechaPago?: SortOrder
    total?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _count?: RecibosCountOrderByAggregateInput
    _avg?: RecibosAvgOrderByAggregateInput
    _max?: RecibosMaxOrderByAggregateInput
    _min?: RecibosMinOrderByAggregateInput
    _sum?: RecibosSumOrderByAggregateInput
  }

  export type RecibosScalarWhereWithAggregatesInput = {
    AND?: RecibosScalarWhereWithAggregatesInput | RecibosScalarWhereWithAggregatesInput[]
    OR?: RecibosScalarWhereWithAggregatesInput[]
    NOT?: RecibosScalarWhereWithAggregatesInput | RecibosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recibos"> | string
    contratoId?: StringWithAggregatesFilter<"Recibos"> | string
    fechaPago?: DateTimeWithAggregatesFilter<"Recibos"> | Date | string
    total?: DecimalWithAggregatesFilter<"Recibos"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeWithAggregatesFilter<"Recibos"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Recibos"> | Date | string
  }

  export type ReciboDetallesWhereInput = {
    AND?: ReciboDetallesWhereInput | ReciboDetallesWhereInput[]
    OR?: ReciboDetallesWhereInput[]
    NOT?: ReciboDetallesWhereInput | ReciboDetallesWhereInput[]
    id?: StringFilter<"ReciboDetalles"> | string
    reciboId?: StringFilter<"ReciboDetalles"> | string
    descripcion?: StringFilter<"ReciboDetalles"> | string
    monto?: DecimalFilter<"ReciboDetalles"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
    updateAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
    recibo?: XOR<RecibosScalarRelationFilter, RecibosWhereInput>
  }

  export type ReciboDetallesOrderByWithRelationInput = {
    id?: SortOrder
    reciboId?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    recibo?: RecibosOrderByWithRelationInput
    _relevance?: ReciboDetallesOrderByRelevanceInput
  }

  export type ReciboDetallesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReciboDetallesWhereInput | ReciboDetallesWhereInput[]
    OR?: ReciboDetallesWhereInput[]
    NOT?: ReciboDetallesWhereInput | ReciboDetallesWhereInput[]
    reciboId?: StringFilter<"ReciboDetalles"> | string
    descripcion?: StringFilter<"ReciboDetalles"> | string
    monto?: DecimalFilter<"ReciboDetalles"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
    updateAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
    recibo?: XOR<RecibosScalarRelationFilter, RecibosWhereInput>
  }, "id">

  export type ReciboDetallesOrderByWithAggregationInput = {
    id?: SortOrder
    reciboId?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _count?: ReciboDetallesCountOrderByAggregateInput
    _avg?: ReciboDetallesAvgOrderByAggregateInput
    _max?: ReciboDetallesMaxOrderByAggregateInput
    _min?: ReciboDetallesMinOrderByAggregateInput
    _sum?: ReciboDetallesSumOrderByAggregateInput
  }

  export type ReciboDetallesScalarWhereWithAggregatesInput = {
    AND?: ReciboDetallesScalarWhereWithAggregatesInput | ReciboDetallesScalarWhereWithAggregatesInput[]
    OR?: ReciboDetallesScalarWhereWithAggregatesInput[]
    NOT?: ReciboDetallesScalarWhereWithAggregatesInput | ReciboDetallesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReciboDetalles"> | string
    reciboId?: StringWithAggregatesFilter<"ReciboDetalles"> | string
    descripcion?: StringWithAggregatesFilter<"ReciboDetalles"> | string
    monto?: DecimalWithAggregatesFilter<"ReciboDetalles"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeWithAggregatesFilter<"ReciboDetalles"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"ReciboDetalles"> | Date | string
  }

  export type PermisoWhereInput = {
    AND?: PermisoWhereInput | PermisoWhereInput[]
    OR?: PermisoWhereInput[]
    NOT?: PermisoWhereInput | PermisoWhereInput[]
    id?: StringFilter<"Permiso"> | string
    nombre?: StringFilter<"Permiso"> | string
    descripcion?: StringFilter<"Permiso"> | string
    createAt?: DateTimeFilter<"Permiso"> | Date | string
    updateAt?: DateTimeFilter<"Permiso"> | Date | string
    activo?: BoolFilter<"Permiso"> | boolean
    roles?: RolPermisoListRelationFilter
  }

  export type PermisoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    roles?: RolPermisoOrderByRelationAggregateInput
    _relevance?: PermisoOrderByRelevanceInput
  }

  export type PermisoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: PermisoWhereInput | PermisoWhereInput[]
    OR?: PermisoWhereInput[]
    NOT?: PermisoWhereInput | PermisoWhereInput[]
    descripcion?: StringFilter<"Permiso"> | string
    createAt?: DateTimeFilter<"Permiso"> | Date | string
    updateAt?: DateTimeFilter<"Permiso"> | Date | string
    activo?: BoolFilter<"Permiso"> | boolean
    roles?: RolPermisoListRelationFilter
  }, "id" | "nombre">

  export type PermisoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    _count?: PermisoCountOrderByAggregateInput
    _max?: PermisoMaxOrderByAggregateInput
    _min?: PermisoMinOrderByAggregateInput
  }

  export type PermisoScalarWhereWithAggregatesInput = {
    AND?: PermisoScalarWhereWithAggregatesInput | PermisoScalarWhereWithAggregatesInput[]
    OR?: PermisoScalarWhereWithAggregatesInput[]
    NOT?: PermisoScalarWhereWithAggregatesInput | PermisoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permiso"> | string
    nombre?: StringWithAggregatesFilter<"Permiso"> | string
    descripcion?: StringWithAggregatesFilter<"Permiso"> | string
    createAt?: DateTimeWithAggregatesFilter<"Permiso"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Permiso"> | Date | string
    activo?: BoolWithAggregatesFilter<"Permiso"> | boolean
  }

  export type RolPermisoWhereInput = {
    AND?: RolPermisoWhereInput | RolPermisoWhereInput[]
    OR?: RolPermisoWhereInput[]
    NOT?: RolPermisoWhereInput | RolPermisoWhereInput[]
    id?: StringFilter<"RolPermiso"> | string
    rolId?: StringFilter<"RolPermiso"> | string
    permisoId?: StringFilter<"RolPermiso"> | string
    createAt?: DateTimeFilter<"RolPermiso"> | Date | string
    permiso?: XOR<PermisoScalarRelationFilter, PermisoWhereInput>
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
  }

  export type RolPermisoOrderByWithRelationInput = {
    id?: SortOrder
    rolId?: SortOrder
    permisoId?: SortOrder
    createAt?: SortOrder
    permiso?: PermisoOrderByWithRelationInput
    rol?: RolOrderByWithRelationInput
    _relevance?: RolPermisoOrderByRelevanceInput
  }

  export type RolPermisoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rolId_permisoId?: RolPermisoRolIdPermisoIdCompoundUniqueInput
    AND?: RolPermisoWhereInput | RolPermisoWhereInput[]
    OR?: RolPermisoWhereInput[]
    NOT?: RolPermisoWhereInput | RolPermisoWhereInput[]
    rolId?: StringFilter<"RolPermiso"> | string
    permisoId?: StringFilter<"RolPermiso"> | string
    createAt?: DateTimeFilter<"RolPermiso"> | Date | string
    permiso?: XOR<PermisoScalarRelationFilter, PermisoWhereInput>
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
  }, "id" | "rolId_permisoId">

  export type RolPermisoOrderByWithAggregationInput = {
    id?: SortOrder
    rolId?: SortOrder
    permisoId?: SortOrder
    createAt?: SortOrder
    _count?: RolPermisoCountOrderByAggregateInput
    _max?: RolPermisoMaxOrderByAggregateInput
    _min?: RolPermisoMinOrderByAggregateInput
  }

  export type RolPermisoScalarWhereWithAggregatesInput = {
    AND?: RolPermisoScalarWhereWithAggregatesInput | RolPermisoScalarWhereWithAggregatesInput[]
    OR?: RolPermisoScalarWhereWithAggregatesInput[]
    NOT?: RolPermisoScalarWhereWithAggregatesInput | RolPermisoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RolPermiso"> | string
    rolId?: StringWithAggregatesFilter<"RolPermiso"> | string
    permisoId?: StringWithAggregatesFilter<"RolPermiso"> | string
    createAt?: DateTimeWithAggregatesFilter<"RolPermiso"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    createAt?: DateTimeFilter<"Usuario"> | Date | string
    updateAt?: DateTimeFilter<"Usuario"> | Date | string
    activo?: BoolFilter<"Usuario"> | boolean
    rolId?: StringFilter<"Usuario"> | string
    DebeCambiar?: BoolFilter<"Usuario"> | boolean
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    rolId?: SortOrder
    DebeCambiar?: SortOrder
    rol?: RolOrderByWithRelationInput
    _relevance?: UsuarioOrderByRelevanceInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    createAt?: DateTimeFilter<"Usuario"> | Date | string
    updateAt?: DateTimeFilter<"Usuario"> | Date | string
    activo?: BoolFilter<"Usuario"> | boolean
    rolId?: StringFilter<"Usuario"> | string
    DebeCambiar?: BoolFilter<"Usuario"> | boolean
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    rolId?: SortOrder
    DebeCambiar?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    createAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    activo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    rolId?: StringWithAggregatesFilter<"Usuario"> | string
    DebeCambiar?: BoolWithAggregatesFilter<"Usuario"> | boolean
  }

  export type RolCreateInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    permisos?: RolPermisoCreateNestedManyWithoutRolInput
    Usuario?: UsuarioCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    permisos?: RolPermisoUncheckedCreateNestedManyWithoutRolInput
    Usuario?: UsuarioUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    permisos?: RolPermisoUpdateManyWithoutRolNestedInput
    Usuario?: UsuarioUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    permisos?: RolPermisoUncheckedUpdateManyWithoutRolNestedInput
    Usuario?: UsuarioUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolCreateManyInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type RolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InquilinoCreateInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Acompañante?: AcompañanteCreateNestedManyWithoutInquilinoInput
    Contratos?: ContratosCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoUncheckedCreateInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Acompañante?: AcompañanteUncheckedCreateNestedManyWithoutInquilinoInput
    Contratos?: ContratosUncheckedCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Acompañante?: AcompañanteUpdateManyWithoutInquilinoNestedInput
    Contratos?: ContratosUpdateManyWithoutInquilinoNestedInput
  }

  export type InquilinoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Acompañante?: AcompañanteUncheckedUpdateManyWithoutInquilinoNestedInput
    Contratos?: ContratosUncheckedUpdateManyWithoutInquilinoNestedInput
  }

  export type InquilinoCreateManyInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type InquilinoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InquilinoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteCreateInput = {
    id?: string
    nombreCompleto: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    inquilino: InquilinoCreateNestedOneWithoutAcompañanteInput
  }

  export type AcompañanteUncheckedCreateInput = {
    id?: string
    nombreCompleto: string
    inquilinoId: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type AcompañanteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    inquilino?: InquilinoUpdateOneRequiredWithoutAcompañanteNestedInput
  }

  export type AcompañanteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteCreateManyInput = {
    id?: string
    nombreCompleto: string
    inquilinoId: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type AcompañanteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApartamentoCreateInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesCreateNestedManyWithoutApartamentoInput
    ApartamentoServicios?: ApartamentoServiciosCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoUncheckedCreateInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesUncheckedCreateNestedManyWithoutApartamentoInput
    ApartamentoServicios?: ApartamentoServiciosUncheckedCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosUncheckedCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUpdateManyWithoutApartamentoNestedInput
    ApartamentoServicios?: ApartamentoServiciosUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUpdateManyWithoutApartamentoNestedInput
  }

  export type ApartamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUncheckedUpdateManyWithoutApartamentoNestedInput
    ApartamentoServicios?: ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUncheckedUpdateManyWithoutApartamentoNestedInput
  }

  export type ApartamentoCreateManyInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
  }

  export type ApartamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApartamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TiposHabitacionCreateInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    apartamento?: HabitacionesCreateNestedManyWithoutTipoHabitacionInput
  }

  export type TiposHabitacionUncheckedCreateInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    apartamento?: HabitacionesUncheckedCreateNestedManyWithoutTipoHabitacionInput
  }

  export type TiposHabitacionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUpdateManyWithoutTipoHabitacionNestedInput
  }

  export type TiposHabitacionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUncheckedUpdateManyWithoutTipoHabitacionNestedInput
  }

  export type TiposHabitacionCreateManyInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type TiposHabitacionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TiposHabitacionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HabitacionesCreateInput = {
    id?: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
    apartamento: ApartamentoCreateNestedOneWithoutApartamentoInput
    tipoHabitacion: TiposHabitacionCreateNestedOneWithoutApartamentoInput
  }

  export type HabitacionesUncheckedCreateInput = {
    id?: string
    apartamentoId: string
    tipoHabitacionId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type HabitacionesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apartamento?: ApartamentoUpdateOneRequiredWithoutApartamentoNestedInput
    tipoHabitacion?: TiposHabitacionUpdateOneRequiredWithoutApartamentoNestedInput
  }

  export type HabitacionesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    tipoHabitacionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HabitacionesCreateManyInput = {
    id?: string
    apartamentoId: string
    tipoHabitacionId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type HabitacionesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HabitacionesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    tipoHabitacionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiciosCreateInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    ApartamentoServicios?: ApartamentoServiciosCreateNestedManyWithoutServicioInput
  }

  export type ServiciosUncheckedCreateInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    ApartamentoServicios?: ApartamentoServiciosUncheckedCreateNestedManyWithoutServicioInput
  }

  export type ServiciosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    ApartamentoServicios?: ApartamentoServiciosUpdateManyWithoutServicioNestedInput
  }

  export type ServiciosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    ApartamentoServicios?: ApartamentoServiciosUncheckedUpdateManyWithoutServicioNestedInput
  }

  export type ServiciosCreateManyInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type ServiciosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiciosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApartamentoServiciosCreateInput = {
    id?: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    apartamento: ApartamentoCreateNestedOneWithoutApartamentoServiciosInput
    servicio: ServiciosCreateNestedOneWithoutApartamentoServiciosInput
  }

  export type ApartamentoServiciosUncheckedCreateInput = {
    id?: string
    apartamentoId: string
    servicioId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ApartamentoServiciosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apartamento?: ApartamentoUpdateOneRequiredWithoutApartamentoServiciosNestedInput
    servicio?: ServiciosUpdateOneRequiredWithoutApartamentoServiciosNestedInput
  }

  export type ApartamentoServiciosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    servicioId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosCreateManyInput = {
    id?: string
    apartamentoId: string
    servicioId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ApartamentoServiciosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    servicioId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContratosCreateInput = {
    id?: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    inquilino: InquilinoCreateNestedOneWithoutContratosInput
    apartamento: ApartamentoCreateNestedOneWithoutContratosInput
    recibos?: RecibosCreateNestedManyWithoutContratoInput
  }

  export type ContratosUncheckedCreateInput = {
    id?: string
    inquilinoId: string
    apartamentoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    recibos?: RecibosUncheckedCreateNestedManyWithoutContratoInput
  }

  export type ContratosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    inquilino?: InquilinoUpdateOneRequiredWithoutContratosNestedInput
    apartamento?: ApartamentoUpdateOneRequiredWithoutContratosNestedInput
    recibos?: RecibosUpdateManyWithoutContratoNestedInput
  }

  export type ContratosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    recibos?: RecibosUncheckedUpdateManyWithoutContratoNestedInput
  }

  export type ContratosCreateManyInput = {
    id?: string
    inquilinoId: string
    apartamentoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
  }

  export type ContratosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContratosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecibosCreateInput = {
    id?: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    contrato: ContratosCreateNestedOneWithoutRecibosInput
    detalles?: ReciboDetallesCreateNestedManyWithoutReciboInput
  }

  export type RecibosUncheckedCreateInput = {
    id?: string
    contratoId: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    detalles?: ReciboDetallesUncheckedCreateNestedManyWithoutReciboInput
  }

  export type RecibosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contrato?: ContratosUpdateOneRequiredWithoutRecibosNestedInput
    detalles?: ReciboDetallesUpdateManyWithoutReciboNestedInput
  }

  export type RecibosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contratoId?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: ReciboDetallesUncheckedUpdateManyWithoutReciboNestedInput
  }

  export type RecibosCreateManyInput = {
    id?: string
    contratoId: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type RecibosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecibosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contratoId?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesCreateInput = {
    id?: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    recibo: RecibosCreateNestedOneWithoutDetallesInput
  }

  export type ReciboDetallesUncheckedCreateInput = {
    id?: string
    reciboId: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ReciboDetallesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recibo?: RecibosUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type ReciboDetallesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reciboId?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesCreateManyInput = {
    id?: string
    reciboId: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ReciboDetallesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reciboId?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermisoCreateInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    roles?: RolPermisoCreateNestedManyWithoutPermisoInput
  }

  export type PermisoUncheckedCreateInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    roles?: RolPermisoUncheckedCreateNestedManyWithoutPermisoInput
  }

  export type PermisoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    roles?: RolPermisoUpdateManyWithoutPermisoNestedInput
  }

  export type PermisoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    roles?: RolPermisoUncheckedUpdateManyWithoutPermisoNestedInput
  }

  export type PermisoCreateManyInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type PermisoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PermisoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoCreateInput = {
    id?: string
    createAt?: Date | string
    permiso: PermisoCreateNestedOneWithoutRolesInput
    rol: RolCreateNestedOneWithoutPermisosInput
  }

  export type RolPermisoUncheckedCreateInput = {
    id?: string
    rolId: string
    permisoId: string
    createAt?: Date | string
  }

  export type RolPermisoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permiso?: PermisoUpdateOneRequiredWithoutRolesNestedInput
    rol?: RolUpdateOneRequiredWithoutPermisosNestedInput
  }

  export type RolPermisoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    permisoId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoCreateManyInput = {
    id?: string
    rolId: string
    permisoId: string
    createAt?: Date | string
  }

  export type RolPermisoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    permisoId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    DebeCambiar: boolean
    rol: RolCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    rolId: string
    DebeCambiar: boolean
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
    rol?: RolUpdateOneRequiredWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rolId?: StringFieldUpdateOperationsInput | string
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    rolId: string
    DebeCambiar: boolean
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rolId?: StringFieldUpdateOperationsInput | string
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RolPermisoListRelationFilter = {
    every?: RolPermisoWhereInput
    some?: RolPermisoWhereInput
    none?: RolPermisoWhereInput
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type RolPermisoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RolOrderByRelevanceInput = {
    fields: RolOrderByRelevanceFieldEnum | RolOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RolCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type RolMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type RolMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AcompañanteListRelationFilter = {
    every?: AcompañanteWhereInput
    some?: AcompañanteWhereInput
    none?: AcompañanteWhereInput
  }

  export type ContratosListRelationFilter = {
    every?: ContratosWhereInput
    some?: ContratosWhereInput
    none?: ContratosWhereInput
  }

  export type AcompañanteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContratosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InquilinoOrderByRelevanceInput = {
    fields: InquilinoOrderByRelevanceFieldEnum | InquilinoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InquilinoCountOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    dni?: SortOrder
    numero?: SortOrder
    correo?: SortOrder
    fechaNacimiento?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type InquilinoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    dni?: SortOrder
    numero?: SortOrder
    correo?: SortOrder
    fechaNacimiento?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type InquilinoMinOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    dni?: SortOrder
    numero?: SortOrder
    correo?: SortOrder
    fechaNacimiento?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type InquilinoScalarRelationFilter = {
    is?: InquilinoWhereInput
    isNot?: InquilinoWhereInput
  }

  export type AcompañanteOrderByRelevanceInput = {
    fields: AcompañanteOrderByRelevanceFieldEnum | AcompañanteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcompañanteCountOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    inquilinoId?: SortOrder
    Parentesco?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type AcompañanteMaxOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    inquilinoId?: SortOrder
    Parentesco?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type AcompañanteMinOrderByAggregateInput = {
    id?: SortOrder
    nombreCompleto?: SortOrder
    inquilinoId?: SortOrder
    Parentesco?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type HabitacionesListRelationFilter = {
    every?: HabitacionesWhereInput
    some?: HabitacionesWhereInput
    none?: HabitacionesWhereInput
  }

  export type ApartamentoServiciosListRelationFilter = {
    every?: ApartamentoServiciosWhereInput
    some?: ApartamentoServiciosWhereInput
    none?: ApartamentoServiciosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HabitacionesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApartamentoServiciosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApartamentoOrderByRelevanceInput = {
    fields: ApartamentoOrderByRelevanceFieldEnum | ApartamentoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ApartamentoCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    direccion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    disponible?: SortOrder
    activo?: SortOrder
  }

  export type ApartamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    direccion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    disponible?: SortOrder
    activo?: SortOrder
  }

  export type ApartamentoMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    direccion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    disponible?: SortOrder
    activo?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TiposHabitacionOrderByRelevanceInput = {
    fields: TiposHabitacionOrderByRelevanceFieldEnum | TiposHabitacionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TiposHabitacionCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type TiposHabitacionMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type TiposHabitacionMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ApartamentoScalarRelationFilter = {
    is?: ApartamentoWhereInput
    isNot?: ApartamentoWhereInput
  }

  export type TiposHabitacionScalarRelationFilter = {
    is?: TiposHabitacionWhereInput
    isNot?: TiposHabitacionWhereInput
  }

  export type HabitacionesOrderByRelevanceInput = {
    fields: HabitacionesOrderByRelevanceFieldEnum | HabitacionesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HabitacionesCountOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    tipoHabitacionId?: SortOrder
    cantidad?: SortOrder
    createAt?: SortOrder
    activo?: SortOrder
    updateAt?: SortOrder
  }

  export type HabitacionesAvgOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type HabitacionesMaxOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    tipoHabitacionId?: SortOrder
    cantidad?: SortOrder
    createAt?: SortOrder
    activo?: SortOrder
    updateAt?: SortOrder
  }

  export type HabitacionesMinOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    tipoHabitacionId?: SortOrder
    cantidad?: SortOrder
    createAt?: SortOrder
    activo?: SortOrder
    updateAt?: SortOrder
  }

  export type HabitacionesSumOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ServiciosOrderByRelevanceInput = {
    fields: ServiciosOrderByRelevanceFieldEnum | ServiciosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ServiciosCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type ServiciosMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type ServiciosMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ServiciosScalarRelationFilter = {
    is?: ServiciosWhereInput
    isNot?: ServiciosWhereInput
  }

  export type ApartamentoServiciosOrderByRelevanceInput = {
    fields: ApartamentoServiciosOrderByRelevanceFieldEnum | ApartamentoServiciosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ApartamentoServiciosCountOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    servicioId?: SortOrder
    incluido?: SortOrder
    costoAdicional?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ApartamentoServiciosAvgOrderByAggregateInput = {
    costoAdicional?: SortOrder
  }

  export type ApartamentoServiciosMaxOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    servicioId?: SortOrder
    incluido?: SortOrder
    costoAdicional?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ApartamentoServiciosMinOrderByAggregateInput = {
    id?: SortOrder
    apartamentoId?: SortOrder
    servicioId?: SortOrder
    incluido?: SortOrder
    costoAdicional?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ApartamentoServiciosSumOrderByAggregateInput = {
    costoAdicional?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RecibosListRelationFilter = {
    every?: RecibosWhereInput
    some?: RecibosWhereInput
    none?: RecibosWhereInput
  }

  export type RecibosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContratosOrderByRelevanceInput = {
    fields: ContratosOrderByRelevanceFieldEnum | ContratosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContratosCountOrderByAggregateInput = {
    id?: SortOrder
    inquilinoId?: SortOrder
    apartamentoId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    montoMensual?: SortOrder
    activo?: SortOrder
  }

  export type ContratosAvgOrderByAggregateInput = {
    montoMensual?: SortOrder
  }

  export type ContratosMaxOrderByAggregateInput = {
    id?: SortOrder
    inquilinoId?: SortOrder
    apartamentoId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    montoMensual?: SortOrder
    activo?: SortOrder
  }

  export type ContratosMinOrderByAggregateInput = {
    id?: SortOrder
    inquilinoId?: SortOrder
    apartamentoId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    montoMensual?: SortOrder
    activo?: SortOrder
  }

  export type ContratosSumOrderByAggregateInput = {
    montoMensual?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ContratosScalarRelationFilter = {
    is?: ContratosWhereInput
    isNot?: ContratosWhereInput
  }

  export type ReciboDetallesListRelationFilter = {
    every?: ReciboDetallesWhereInput
    some?: ReciboDetallesWhereInput
    none?: ReciboDetallesWhereInput
  }

  export type ReciboDetallesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecibosOrderByRelevanceInput = {
    fields: RecibosOrderByRelevanceFieldEnum | RecibosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RecibosCountOrderByAggregateInput = {
    id?: SortOrder
    contratoId?: SortOrder
    fechaPago?: SortOrder
    total?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type RecibosAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type RecibosMaxOrderByAggregateInput = {
    id?: SortOrder
    contratoId?: SortOrder
    fechaPago?: SortOrder
    total?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type RecibosMinOrderByAggregateInput = {
    id?: SortOrder
    contratoId?: SortOrder
    fechaPago?: SortOrder
    total?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type RecibosSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type RecibosScalarRelationFilter = {
    is?: RecibosWhereInput
    isNot?: RecibosWhereInput
  }

  export type ReciboDetallesOrderByRelevanceInput = {
    fields: ReciboDetallesOrderByRelevanceFieldEnum | ReciboDetallesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReciboDetallesCountOrderByAggregateInput = {
    id?: SortOrder
    reciboId?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ReciboDetallesAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type ReciboDetallesMaxOrderByAggregateInput = {
    id?: SortOrder
    reciboId?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ReciboDetallesMinOrderByAggregateInput = {
    id?: SortOrder
    reciboId?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ReciboDetallesSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type PermisoOrderByRelevanceInput = {
    fields: PermisoOrderByRelevanceFieldEnum | PermisoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PermisoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type PermisoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type PermisoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
  }

  export type PermisoScalarRelationFilter = {
    is?: PermisoWhereInput
    isNot?: PermisoWhereInput
  }

  export type RolScalarRelationFilter = {
    is?: RolWhereInput
    isNot?: RolWhereInput
  }

  export type RolPermisoOrderByRelevanceInput = {
    fields: RolPermisoOrderByRelevanceFieldEnum | RolPermisoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RolPermisoRolIdPermisoIdCompoundUniqueInput = {
    rolId: string
    permisoId: string
  }

  export type RolPermisoCountOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    permisoId?: SortOrder
    createAt?: SortOrder
  }

  export type RolPermisoMaxOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    permisoId?: SortOrder
    createAt?: SortOrder
  }

  export type RolPermisoMinOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    permisoId?: SortOrder
    createAt?: SortOrder
  }

  export type UsuarioOrderByRelevanceInput = {
    fields: UsuarioOrderByRelevanceFieldEnum | UsuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    rolId?: SortOrder
    DebeCambiar?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    rolId?: SortOrder
    DebeCambiar?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    activo?: SortOrder
    rolId?: SortOrder
    DebeCambiar?: SortOrder
  }

  export type RolPermisoCreateNestedManyWithoutRolInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type UsuarioCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type RolPermisoUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RolPermisoUpdateManyWithoutRolNestedInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutRolInput | RolPermisoUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutRolInput | RolPermisoUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutRolInput | RolPermisoUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type UsuarioUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type RolPermisoUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutRolInput | RolPermisoUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutRolInput | RolPermisoUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutRolInput | RolPermisoUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type AcompañanteCreateNestedManyWithoutInquilinoInput = {
    create?: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput> | AcompañanteCreateWithoutInquilinoInput[] | AcompañanteUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: AcompañanteCreateOrConnectWithoutInquilinoInput | AcompañanteCreateOrConnectWithoutInquilinoInput[]
    createMany?: AcompañanteCreateManyInquilinoInputEnvelope
    connect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
  }

  export type ContratosCreateNestedManyWithoutInquilinoInput = {
    create?: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput> | ContratosCreateWithoutInquilinoInput[] | ContratosUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutInquilinoInput | ContratosCreateOrConnectWithoutInquilinoInput[]
    createMany?: ContratosCreateManyInquilinoInputEnvelope
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
  }

  export type AcompañanteUncheckedCreateNestedManyWithoutInquilinoInput = {
    create?: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput> | AcompañanteCreateWithoutInquilinoInput[] | AcompañanteUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: AcompañanteCreateOrConnectWithoutInquilinoInput | AcompañanteCreateOrConnectWithoutInquilinoInput[]
    createMany?: AcompañanteCreateManyInquilinoInputEnvelope
    connect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
  }

  export type ContratosUncheckedCreateNestedManyWithoutInquilinoInput = {
    create?: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput> | ContratosCreateWithoutInquilinoInput[] | ContratosUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutInquilinoInput | ContratosCreateOrConnectWithoutInquilinoInput[]
    createMany?: ContratosCreateManyInquilinoInputEnvelope
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
  }

  export type AcompañanteUpdateManyWithoutInquilinoNestedInput = {
    create?: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput> | AcompañanteCreateWithoutInquilinoInput[] | AcompañanteUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: AcompañanteCreateOrConnectWithoutInquilinoInput | AcompañanteCreateOrConnectWithoutInquilinoInput[]
    upsert?: AcompañanteUpsertWithWhereUniqueWithoutInquilinoInput | AcompañanteUpsertWithWhereUniqueWithoutInquilinoInput[]
    createMany?: AcompañanteCreateManyInquilinoInputEnvelope
    set?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    disconnect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    delete?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    connect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    update?: AcompañanteUpdateWithWhereUniqueWithoutInquilinoInput | AcompañanteUpdateWithWhereUniqueWithoutInquilinoInput[]
    updateMany?: AcompañanteUpdateManyWithWhereWithoutInquilinoInput | AcompañanteUpdateManyWithWhereWithoutInquilinoInput[]
    deleteMany?: AcompañanteScalarWhereInput | AcompañanteScalarWhereInput[]
  }

  export type ContratosUpdateManyWithoutInquilinoNestedInput = {
    create?: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput> | ContratosCreateWithoutInquilinoInput[] | ContratosUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutInquilinoInput | ContratosCreateOrConnectWithoutInquilinoInput[]
    upsert?: ContratosUpsertWithWhereUniqueWithoutInquilinoInput | ContratosUpsertWithWhereUniqueWithoutInquilinoInput[]
    createMany?: ContratosCreateManyInquilinoInputEnvelope
    set?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    disconnect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    delete?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    update?: ContratosUpdateWithWhereUniqueWithoutInquilinoInput | ContratosUpdateWithWhereUniqueWithoutInquilinoInput[]
    updateMany?: ContratosUpdateManyWithWhereWithoutInquilinoInput | ContratosUpdateManyWithWhereWithoutInquilinoInput[]
    deleteMany?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
  }

  export type AcompañanteUncheckedUpdateManyWithoutInquilinoNestedInput = {
    create?: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput> | AcompañanteCreateWithoutInquilinoInput[] | AcompañanteUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: AcompañanteCreateOrConnectWithoutInquilinoInput | AcompañanteCreateOrConnectWithoutInquilinoInput[]
    upsert?: AcompañanteUpsertWithWhereUniqueWithoutInquilinoInput | AcompañanteUpsertWithWhereUniqueWithoutInquilinoInput[]
    createMany?: AcompañanteCreateManyInquilinoInputEnvelope
    set?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    disconnect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    delete?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    connect?: AcompañanteWhereUniqueInput | AcompañanteWhereUniqueInput[]
    update?: AcompañanteUpdateWithWhereUniqueWithoutInquilinoInput | AcompañanteUpdateWithWhereUniqueWithoutInquilinoInput[]
    updateMany?: AcompañanteUpdateManyWithWhereWithoutInquilinoInput | AcompañanteUpdateManyWithWhereWithoutInquilinoInput[]
    deleteMany?: AcompañanteScalarWhereInput | AcompañanteScalarWhereInput[]
  }

  export type ContratosUncheckedUpdateManyWithoutInquilinoNestedInput = {
    create?: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput> | ContratosCreateWithoutInquilinoInput[] | ContratosUncheckedCreateWithoutInquilinoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutInquilinoInput | ContratosCreateOrConnectWithoutInquilinoInput[]
    upsert?: ContratosUpsertWithWhereUniqueWithoutInquilinoInput | ContratosUpsertWithWhereUniqueWithoutInquilinoInput[]
    createMany?: ContratosCreateManyInquilinoInputEnvelope
    set?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    disconnect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    delete?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    update?: ContratosUpdateWithWhereUniqueWithoutInquilinoInput | ContratosUpdateWithWhereUniqueWithoutInquilinoInput[]
    updateMany?: ContratosUpdateManyWithWhereWithoutInquilinoInput | ContratosUpdateManyWithWhereWithoutInquilinoInput[]
    deleteMany?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
  }

  export type InquilinoCreateNestedOneWithoutAcompañanteInput = {
    create?: XOR<InquilinoCreateWithoutAcompañanteInput, InquilinoUncheckedCreateWithoutAcompañanteInput>
    connectOrCreate?: InquilinoCreateOrConnectWithoutAcompañanteInput
    connect?: InquilinoWhereUniqueInput
  }

  export type InquilinoUpdateOneRequiredWithoutAcompañanteNestedInput = {
    create?: XOR<InquilinoCreateWithoutAcompañanteInput, InquilinoUncheckedCreateWithoutAcompañanteInput>
    connectOrCreate?: InquilinoCreateOrConnectWithoutAcompañanteInput
    upsert?: InquilinoUpsertWithoutAcompañanteInput
    connect?: InquilinoWhereUniqueInput
    update?: XOR<XOR<InquilinoUpdateToOneWithWhereWithoutAcompañanteInput, InquilinoUpdateWithoutAcompañanteInput>, InquilinoUncheckedUpdateWithoutAcompañanteInput>
  }

  export type HabitacionesCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput> | HabitacionesCreateWithoutApartamentoInput[] | HabitacionesUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutApartamentoInput | HabitacionesCreateOrConnectWithoutApartamentoInput[]
    createMany?: HabitacionesCreateManyApartamentoInputEnvelope
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
  }

  export type ApartamentoServiciosCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput> | ApartamentoServiciosCreateWithoutApartamentoInput[] | ApartamentoServiciosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutApartamentoInput | ApartamentoServiciosCreateOrConnectWithoutApartamentoInput[]
    createMany?: ApartamentoServiciosCreateManyApartamentoInputEnvelope
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
  }

  export type ContratosCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput> | ContratosCreateWithoutApartamentoInput[] | ContratosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutApartamentoInput | ContratosCreateOrConnectWithoutApartamentoInput[]
    createMany?: ContratosCreateManyApartamentoInputEnvelope
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
  }

  export type HabitacionesUncheckedCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput> | HabitacionesCreateWithoutApartamentoInput[] | HabitacionesUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutApartamentoInput | HabitacionesCreateOrConnectWithoutApartamentoInput[]
    createMany?: HabitacionesCreateManyApartamentoInputEnvelope
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
  }

  export type ApartamentoServiciosUncheckedCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput> | ApartamentoServiciosCreateWithoutApartamentoInput[] | ApartamentoServiciosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutApartamentoInput | ApartamentoServiciosCreateOrConnectWithoutApartamentoInput[]
    createMany?: ApartamentoServiciosCreateManyApartamentoInputEnvelope
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
  }

  export type ContratosUncheckedCreateNestedManyWithoutApartamentoInput = {
    create?: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput> | ContratosCreateWithoutApartamentoInput[] | ContratosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutApartamentoInput | ContratosCreateOrConnectWithoutApartamentoInput[]
    createMany?: ContratosCreateManyApartamentoInputEnvelope
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type HabitacionesUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput> | HabitacionesCreateWithoutApartamentoInput[] | HabitacionesUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutApartamentoInput | HabitacionesCreateOrConnectWithoutApartamentoInput[]
    upsert?: HabitacionesUpsertWithWhereUniqueWithoutApartamentoInput | HabitacionesUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: HabitacionesCreateManyApartamentoInputEnvelope
    set?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    disconnect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    delete?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    update?: HabitacionesUpdateWithWhereUniqueWithoutApartamentoInput | HabitacionesUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: HabitacionesUpdateManyWithWhereWithoutApartamentoInput | HabitacionesUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
  }

  export type ApartamentoServiciosUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput> | ApartamentoServiciosCreateWithoutApartamentoInput[] | ApartamentoServiciosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutApartamentoInput | ApartamentoServiciosCreateOrConnectWithoutApartamentoInput[]
    upsert?: ApartamentoServiciosUpsertWithWhereUniqueWithoutApartamentoInput | ApartamentoServiciosUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: ApartamentoServiciosCreateManyApartamentoInputEnvelope
    set?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    disconnect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    delete?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    update?: ApartamentoServiciosUpdateWithWhereUniqueWithoutApartamentoInput | ApartamentoServiciosUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: ApartamentoServiciosUpdateManyWithWhereWithoutApartamentoInput | ApartamentoServiciosUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
  }

  export type ContratosUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput> | ContratosCreateWithoutApartamentoInput[] | ContratosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutApartamentoInput | ContratosCreateOrConnectWithoutApartamentoInput[]
    upsert?: ContratosUpsertWithWhereUniqueWithoutApartamentoInput | ContratosUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: ContratosCreateManyApartamentoInputEnvelope
    set?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    disconnect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    delete?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    update?: ContratosUpdateWithWhereUniqueWithoutApartamentoInput | ContratosUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: ContratosUpdateManyWithWhereWithoutApartamentoInput | ContratosUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
  }

  export type HabitacionesUncheckedUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput> | HabitacionesCreateWithoutApartamentoInput[] | HabitacionesUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutApartamentoInput | HabitacionesCreateOrConnectWithoutApartamentoInput[]
    upsert?: HabitacionesUpsertWithWhereUniqueWithoutApartamentoInput | HabitacionesUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: HabitacionesCreateManyApartamentoInputEnvelope
    set?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    disconnect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    delete?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    update?: HabitacionesUpdateWithWhereUniqueWithoutApartamentoInput | HabitacionesUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: HabitacionesUpdateManyWithWhereWithoutApartamentoInput | HabitacionesUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
  }

  export type ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput> | ApartamentoServiciosCreateWithoutApartamentoInput[] | ApartamentoServiciosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutApartamentoInput | ApartamentoServiciosCreateOrConnectWithoutApartamentoInput[]
    upsert?: ApartamentoServiciosUpsertWithWhereUniqueWithoutApartamentoInput | ApartamentoServiciosUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: ApartamentoServiciosCreateManyApartamentoInputEnvelope
    set?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    disconnect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    delete?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    update?: ApartamentoServiciosUpdateWithWhereUniqueWithoutApartamentoInput | ApartamentoServiciosUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: ApartamentoServiciosUpdateManyWithWhereWithoutApartamentoInput | ApartamentoServiciosUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
  }

  export type ContratosUncheckedUpdateManyWithoutApartamentoNestedInput = {
    create?: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput> | ContratosCreateWithoutApartamentoInput[] | ContratosUncheckedCreateWithoutApartamentoInput[]
    connectOrCreate?: ContratosCreateOrConnectWithoutApartamentoInput | ContratosCreateOrConnectWithoutApartamentoInput[]
    upsert?: ContratosUpsertWithWhereUniqueWithoutApartamentoInput | ContratosUpsertWithWhereUniqueWithoutApartamentoInput[]
    createMany?: ContratosCreateManyApartamentoInputEnvelope
    set?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    disconnect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    delete?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    connect?: ContratosWhereUniqueInput | ContratosWhereUniqueInput[]
    update?: ContratosUpdateWithWhereUniqueWithoutApartamentoInput | ContratosUpdateWithWhereUniqueWithoutApartamentoInput[]
    updateMany?: ContratosUpdateManyWithWhereWithoutApartamentoInput | ContratosUpdateManyWithWhereWithoutApartamentoInput[]
    deleteMany?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
  }

  export type HabitacionesCreateNestedManyWithoutTipoHabitacionInput = {
    create?: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput> | HabitacionesCreateWithoutTipoHabitacionInput[] | HabitacionesUncheckedCreateWithoutTipoHabitacionInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutTipoHabitacionInput | HabitacionesCreateOrConnectWithoutTipoHabitacionInput[]
    createMany?: HabitacionesCreateManyTipoHabitacionInputEnvelope
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
  }

  export type HabitacionesUncheckedCreateNestedManyWithoutTipoHabitacionInput = {
    create?: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput> | HabitacionesCreateWithoutTipoHabitacionInput[] | HabitacionesUncheckedCreateWithoutTipoHabitacionInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutTipoHabitacionInput | HabitacionesCreateOrConnectWithoutTipoHabitacionInput[]
    createMany?: HabitacionesCreateManyTipoHabitacionInputEnvelope
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
  }

  export type HabitacionesUpdateManyWithoutTipoHabitacionNestedInput = {
    create?: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput> | HabitacionesCreateWithoutTipoHabitacionInput[] | HabitacionesUncheckedCreateWithoutTipoHabitacionInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutTipoHabitacionInput | HabitacionesCreateOrConnectWithoutTipoHabitacionInput[]
    upsert?: HabitacionesUpsertWithWhereUniqueWithoutTipoHabitacionInput | HabitacionesUpsertWithWhereUniqueWithoutTipoHabitacionInput[]
    createMany?: HabitacionesCreateManyTipoHabitacionInputEnvelope
    set?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    disconnect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    delete?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    update?: HabitacionesUpdateWithWhereUniqueWithoutTipoHabitacionInput | HabitacionesUpdateWithWhereUniqueWithoutTipoHabitacionInput[]
    updateMany?: HabitacionesUpdateManyWithWhereWithoutTipoHabitacionInput | HabitacionesUpdateManyWithWhereWithoutTipoHabitacionInput[]
    deleteMany?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
  }

  export type HabitacionesUncheckedUpdateManyWithoutTipoHabitacionNestedInput = {
    create?: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput> | HabitacionesCreateWithoutTipoHabitacionInput[] | HabitacionesUncheckedCreateWithoutTipoHabitacionInput[]
    connectOrCreate?: HabitacionesCreateOrConnectWithoutTipoHabitacionInput | HabitacionesCreateOrConnectWithoutTipoHabitacionInput[]
    upsert?: HabitacionesUpsertWithWhereUniqueWithoutTipoHabitacionInput | HabitacionesUpsertWithWhereUniqueWithoutTipoHabitacionInput[]
    createMany?: HabitacionesCreateManyTipoHabitacionInputEnvelope
    set?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    disconnect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    delete?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    connect?: HabitacionesWhereUniqueInput | HabitacionesWhereUniqueInput[]
    update?: HabitacionesUpdateWithWhereUniqueWithoutTipoHabitacionInput | HabitacionesUpdateWithWhereUniqueWithoutTipoHabitacionInput[]
    updateMany?: HabitacionesUpdateManyWithWhereWithoutTipoHabitacionInput | HabitacionesUpdateManyWithWhereWithoutTipoHabitacionInput[]
    deleteMany?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
  }

  export type ApartamentoCreateNestedOneWithoutApartamentoInput = {
    create?: XOR<ApartamentoCreateWithoutApartamentoInput, ApartamentoUncheckedCreateWithoutApartamentoInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutApartamentoInput
    connect?: ApartamentoWhereUniqueInput
  }

  export type TiposHabitacionCreateNestedOneWithoutApartamentoInput = {
    create?: XOR<TiposHabitacionCreateWithoutApartamentoInput, TiposHabitacionUncheckedCreateWithoutApartamentoInput>
    connectOrCreate?: TiposHabitacionCreateOrConnectWithoutApartamentoInput
    connect?: TiposHabitacionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApartamentoUpdateOneRequiredWithoutApartamentoNestedInput = {
    create?: XOR<ApartamentoCreateWithoutApartamentoInput, ApartamentoUncheckedCreateWithoutApartamentoInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutApartamentoInput
    upsert?: ApartamentoUpsertWithoutApartamentoInput
    connect?: ApartamentoWhereUniqueInput
    update?: XOR<XOR<ApartamentoUpdateToOneWithWhereWithoutApartamentoInput, ApartamentoUpdateWithoutApartamentoInput>, ApartamentoUncheckedUpdateWithoutApartamentoInput>
  }

  export type TiposHabitacionUpdateOneRequiredWithoutApartamentoNestedInput = {
    create?: XOR<TiposHabitacionCreateWithoutApartamentoInput, TiposHabitacionUncheckedCreateWithoutApartamentoInput>
    connectOrCreate?: TiposHabitacionCreateOrConnectWithoutApartamentoInput
    upsert?: TiposHabitacionUpsertWithoutApartamentoInput
    connect?: TiposHabitacionWhereUniqueInput
    update?: XOR<XOR<TiposHabitacionUpdateToOneWithWhereWithoutApartamentoInput, TiposHabitacionUpdateWithoutApartamentoInput>, TiposHabitacionUncheckedUpdateWithoutApartamentoInput>
  }

  export type ApartamentoServiciosCreateNestedManyWithoutServicioInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput> | ApartamentoServiciosCreateWithoutServicioInput[] | ApartamentoServiciosUncheckedCreateWithoutServicioInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutServicioInput | ApartamentoServiciosCreateOrConnectWithoutServicioInput[]
    createMany?: ApartamentoServiciosCreateManyServicioInputEnvelope
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
  }

  export type ApartamentoServiciosUncheckedCreateNestedManyWithoutServicioInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput> | ApartamentoServiciosCreateWithoutServicioInput[] | ApartamentoServiciosUncheckedCreateWithoutServicioInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutServicioInput | ApartamentoServiciosCreateOrConnectWithoutServicioInput[]
    createMany?: ApartamentoServiciosCreateManyServicioInputEnvelope
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
  }

  export type ApartamentoServiciosUpdateManyWithoutServicioNestedInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput> | ApartamentoServiciosCreateWithoutServicioInput[] | ApartamentoServiciosUncheckedCreateWithoutServicioInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutServicioInput | ApartamentoServiciosCreateOrConnectWithoutServicioInput[]
    upsert?: ApartamentoServiciosUpsertWithWhereUniqueWithoutServicioInput | ApartamentoServiciosUpsertWithWhereUniqueWithoutServicioInput[]
    createMany?: ApartamentoServiciosCreateManyServicioInputEnvelope
    set?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    disconnect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    delete?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    update?: ApartamentoServiciosUpdateWithWhereUniqueWithoutServicioInput | ApartamentoServiciosUpdateWithWhereUniqueWithoutServicioInput[]
    updateMany?: ApartamentoServiciosUpdateManyWithWhereWithoutServicioInput | ApartamentoServiciosUpdateManyWithWhereWithoutServicioInput[]
    deleteMany?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
  }

  export type ApartamentoServiciosUncheckedUpdateManyWithoutServicioNestedInput = {
    create?: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput> | ApartamentoServiciosCreateWithoutServicioInput[] | ApartamentoServiciosUncheckedCreateWithoutServicioInput[]
    connectOrCreate?: ApartamentoServiciosCreateOrConnectWithoutServicioInput | ApartamentoServiciosCreateOrConnectWithoutServicioInput[]
    upsert?: ApartamentoServiciosUpsertWithWhereUniqueWithoutServicioInput | ApartamentoServiciosUpsertWithWhereUniqueWithoutServicioInput[]
    createMany?: ApartamentoServiciosCreateManyServicioInputEnvelope
    set?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    disconnect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    delete?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    connect?: ApartamentoServiciosWhereUniqueInput | ApartamentoServiciosWhereUniqueInput[]
    update?: ApartamentoServiciosUpdateWithWhereUniqueWithoutServicioInput | ApartamentoServiciosUpdateWithWhereUniqueWithoutServicioInput[]
    updateMany?: ApartamentoServiciosUpdateManyWithWhereWithoutServicioInput | ApartamentoServiciosUpdateManyWithWhereWithoutServicioInput[]
    deleteMany?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
  }

  export type ApartamentoCreateNestedOneWithoutApartamentoServiciosInput = {
    create?: XOR<ApartamentoCreateWithoutApartamentoServiciosInput, ApartamentoUncheckedCreateWithoutApartamentoServiciosInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutApartamentoServiciosInput
    connect?: ApartamentoWhereUniqueInput
  }

  export type ServiciosCreateNestedOneWithoutApartamentoServiciosInput = {
    create?: XOR<ServiciosCreateWithoutApartamentoServiciosInput, ServiciosUncheckedCreateWithoutApartamentoServiciosInput>
    connectOrCreate?: ServiciosCreateOrConnectWithoutApartamentoServiciosInput
    connect?: ServiciosWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ApartamentoUpdateOneRequiredWithoutApartamentoServiciosNestedInput = {
    create?: XOR<ApartamentoCreateWithoutApartamentoServiciosInput, ApartamentoUncheckedCreateWithoutApartamentoServiciosInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutApartamentoServiciosInput
    upsert?: ApartamentoUpsertWithoutApartamentoServiciosInput
    connect?: ApartamentoWhereUniqueInput
    update?: XOR<XOR<ApartamentoUpdateToOneWithWhereWithoutApartamentoServiciosInput, ApartamentoUpdateWithoutApartamentoServiciosInput>, ApartamentoUncheckedUpdateWithoutApartamentoServiciosInput>
  }

  export type ServiciosUpdateOneRequiredWithoutApartamentoServiciosNestedInput = {
    create?: XOR<ServiciosCreateWithoutApartamentoServiciosInput, ServiciosUncheckedCreateWithoutApartamentoServiciosInput>
    connectOrCreate?: ServiciosCreateOrConnectWithoutApartamentoServiciosInput
    upsert?: ServiciosUpsertWithoutApartamentoServiciosInput
    connect?: ServiciosWhereUniqueInput
    update?: XOR<XOR<ServiciosUpdateToOneWithWhereWithoutApartamentoServiciosInput, ServiciosUpdateWithoutApartamentoServiciosInput>, ServiciosUncheckedUpdateWithoutApartamentoServiciosInput>
  }

  export type InquilinoCreateNestedOneWithoutContratosInput = {
    create?: XOR<InquilinoCreateWithoutContratosInput, InquilinoUncheckedCreateWithoutContratosInput>
    connectOrCreate?: InquilinoCreateOrConnectWithoutContratosInput
    connect?: InquilinoWhereUniqueInput
  }

  export type ApartamentoCreateNestedOneWithoutContratosInput = {
    create?: XOR<ApartamentoCreateWithoutContratosInput, ApartamentoUncheckedCreateWithoutContratosInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutContratosInput
    connect?: ApartamentoWhereUniqueInput
  }

  export type RecibosCreateNestedManyWithoutContratoInput = {
    create?: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput> | RecibosCreateWithoutContratoInput[] | RecibosUncheckedCreateWithoutContratoInput[]
    connectOrCreate?: RecibosCreateOrConnectWithoutContratoInput | RecibosCreateOrConnectWithoutContratoInput[]
    createMany?: RecibosCreateManyContratoInputEnvelope
    connect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
  }

  export type RecibosUncheckedCreateNestedManyWithoutContratoInput = {
    create?: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput> | RecibosCreateWithoutContratoInput[] | RecibosUncheckedCreateWithoutContratoInput[]
    connectOrCreate?: RecibosCreateOrConnectWithoutContratoInput | RecibosCreateOrConnectWithoutContratoInput[]
    createMany?: RecibosCreateManyContratoInputEnvelope
    connect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InquilinoUpdateOneRequiredWithoutContratosNestedInput = {
    create?: XOR<InquilinoCreateWithoutContratosInput, InquilinoUncheckedCreateWithoutContratosInput>
    connectOrCreate?: InquilinoCreateOrConnectWithoutContratosInput
    upsert?: InquilinoUpsertWithoutContratosInput
    connect?: InquilinoWhereUniqueInput
    update?: XOR<XOR<InquilinoUpdateToOneWithWhereWithoutContratosInput, InquilinoUpdateWithoutContratosInput>, InquilinoUncheckedUpdateWithoutContratosInput>
  }

  export type ApartamentoUpdateOneRequiredWithoutContratosNestedInput = {
    create?: XOR<ApartamentoCreateWithoutContratosInput, ApartamentoUncheckedCreateWithoutContratosInput>
    connectOrCreate?: ApartamentoCreateOrConnectWithoutContratosInput
    upsert?: ApartamentoUpsertWithoutContratosInput
    connect?: ApartamentoWhereUniqueInput
    update?: XOR<XOR<ApartamentoUpdateToOneWithWhereWithoutContratosInput, ApartamentoUpdateWithoutContratosInput>, ApartamentoUncheckedUpdateWithoutContratosInput>
  }

  export type RecibosUpdateManyWithoutContratoNestedInput = {
    create?: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput> | RecibosCreateWithoutContratoInput[] | RecibosUncheckedCreateWithoutContratoInput[]
    connectOrCreate?: RecibosCreateOrConnectWithoutContratoInput | RecibosCreateOrConnectWithoutContratoInput[]
    upsert?: RecibosUpsertWithWhereUniqueWithoutContratoInput | RecibosUpsertWithWhereUniqueWithoutContratoInput[]
    createMany?: RecibosCreateManyContratoInputEnvelope
    set?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    disconnect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    delete?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    connect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    update?: RecibosUpdateWithWhereUniqueWithoutContratoInput | RecibosUpdateWithWhereUniqueWithoutContratoInput[]
    updateMany?: RecibosUpdateManyWithWhereWithoutContratoInput | RecibosUpdateManyWithWhereWithoutContratoInput[]
    deleteMany?: RecibosScalarWhereInput | RecibosScalarWhereInput[]
  }

  export type RecibosUncheckedUpdateManyWithoutContratoNestedInput = {
    create?: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput> | RecibosCreateWithoutContratoInput[] | RecibosUncheckedCreateWithoutContratoInput[]
    connectOrCreate?: RecibosCreateOrConnectWithoutContratoInput | RecibosCreateOrConnectWithoutContratoInput[]
    upsert?: RecibosUpsertWithWhereUniqueWithoutContratoInput | RecibosUpsertWithWhereUniqueWithoutContratoInput[]
    createMany?: RecibosCreateManyContratoInputEnvelope
    set?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    disconnect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    delete?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    connect?: RecibosWhereUniqueInput | RecibosWhereUniqueInput[]
    update?: RecibosUpdateWithWhereUniqueWithoutContratoInput | RecibosUpdateWithWhereUniqueWithoutContratoInput[]
    updateMany?: RecibosUpdateManyWithWhereWithoutContratoInput | RecibosUpdateManyWithWhereWithoutContratoInput[]
    deleteMany?: RecibosScalarWhereInput | RecibosScalarWhereInput[]
  }

  export type ContratosCreateNestedOneWithoutRecibosInput = {
    create?: XOR<ContratosCreateWithoutRecibosInput, ContratosUncheckedCreateWithoutRecibosInput>
    connectOrCreate?: ContratosCreateOrConnectWithoutRecibosInput
    connect?: ContratosWhereUniqueInput
  }

  export type ReciboDetallesCreateNestedManyWithoutReciboInput = {
    create?: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput> | ReciboDetallesCreateWithoutReciboInput[] | ReciboDetallesUncheckedCreateWithoutReciboInput[]
    connectOrCreate?: ReciboDetallesCreateOrConnectWithoutReciboInput | ReciboDetallesCreateOrConnectWithoutReciboInput[]
    createMany?: ReciboDetallesCreateManyReciboInputEnvelope
    connect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
  }

  export type ReciboDetallesUncheckedCreateNestedManyWithoutReciboInput = {
    create?: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput> | ReciboDetallesCreateWithoutReciboInput[] | ReciboDetallesUncheckedCreateWithoutReciboInput[]
    connectOrCreate?: ReciboDetallesCreateOrConnectWithoutReciboInput | ReciboDetallesCreateOrConnectWithoutReciboInput[]
    createMany?: ReciboDetallesCreateManyReciboInputEnvelope
    connect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
  }

  export type ContratosUpdateOneRequiredWithoutRecibosNestedInput = {
    create?: XOR<ContratosCreateWithoutRecibosInput, ContratosUncheckedCreateWithoutRecibosInput>
    connectOrCreate?: ContratosCreateOrConnectWithoutRecibosInput
    upsert?: ContratosUpsertWithoutRecibosInput
    connect?: ContratosWhereUniqueInput
    update?: XOR<XOR<ContratosUpdateToOneWithWhereWithoutRecibosInput, ContratosUpdateWithoutRecibosInput>, ContratosUncheckedUpdateWithoutRecibosInput>
  }

  export type ReciboDetallesUpdateManyWithoutReciboNestedInput = {
    create?: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput> | ReciboDetallesCreateWithoutReciboInput[] | ReciboDetallesUncheckedCreateWithoutReciboInput[]
    connectOrCreate?: ReciboDetallesCreateOrConnectWithoutReciboInput | ReciboDetallesCreateOrConnectWithoutReciboInput[]
    upsert?: ReciboDetallesUpsertWithWhereUniqueWithoutReciboInput | ReciboDetallesUpsertWithWhereUniqueWithoutReciboInput[]
    createMany?: ReciboDetallesCreateManyReciboInputEnvelope
    set?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    disconnect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    delete?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    connect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    update?: ReciboDetallesUpdateWithWhereUniqueWithoutReciboInput | ReciboDetallesUpdateWithWhereUniqueWithoutReciboInput[]
    updateMany?: ReciboDetallesUpdateManyWithWhereWithoutReciboInput | ReciboDetallesUpdateManyWithWhereWithoutReciboInput[]
    deleteMany?: ReciboDetallesScalarWhereInput | ReciboDetallesScalarWhereInput[]
  }

  export type ReciboDetallesUncheckedUpdateManyWithoutReciboNestedInput = {
    create?: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput> | ReciboDetallesCreateWithoutReciboInput[] | ReciboDetallesUncheckedCreateWithoutReciboInput[]
    connectOrCreate?: ReciboDetallesCreateOrConnectWithoutReciboInput | ReciboDetallesCreateOrConnectWithoutReciboInput[]
    upsert?: ReciboDetallesUpsertWithWhereUniqueWithoutReciboInput | ReciboDetallesUpsertWithWhereUniqueWithoutReciboInput[]
    createMany?: ReciboDetallesCreateManyReciboInputEnvelope
    set?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    disconnect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    delete?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    connect?: ReciboDetallesWhereUniqueInput | ReciboDetallesWhereUniqueInput[]
    update?: ReciboDetallesUpdateWithWhereUniqueWithoutReciboInput | ReciboDetallesUpdateWithWhereUniqueWithoutReciboInput[]
    updateMany?: ReciboDetallesUpdateManyWithWhereWithoutReciboInput | ReciboDetallesUpdateManyWithWhereWithoutReciboInput[]
    deleteMany?: ReciboDetallesScalarWhereInput | ReciboDetallesScalarWhereInput[]
  }

  export type RecibosCreateNestedOneWithoutDetallesInput = {
    create?: XOR<RecibosCreateWithoutDetallesInput, RecibosUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: RecibosCreateOrConnectWithoutDetallesInput
    connect?: RecibosWhereUniqueInput
  }

  export type RecibosUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<RecibosCreateWithoutDetallesInput, RecibosUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: RecibosCreateOrConnectWithoutDetallesInput
    upsert?: RecibosUpsertWithoutDetallesInput
    connect?: RecibosWhereUniqueInput
    update?: XOR<XOR<RecibosUpdateToOneWithWhereWithoutDetallesInput, RecibosUpdateWithoutDetallesInput>, RecibosUncheckedUpdateWithoutDetallesInput>
  }

  export type RolPermisoCreateNestedManyWithoutPermisoInput = {
    create?: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput> | RolPermisoCreateWithoutPermisoInput[] | RolPermisoUncheckedCreateWithoutPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutPermisoInput | RolPermisoCreateOrConnectWithoutPermisoInput[]
    createMany?: RolPermisoCreateManyPermisoInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type RolPermisoUncheckedCreateNestedManyWithoutPermisoInput = {
    create?: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput> | RolPermisoCreateWithoutPermisoInput[] | RolPermisoUncheckedCreateWithoutPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutPermisoInput | RolPermisoCreateOrConnectWithoutPermisoInput[]
    createMany?: RolPermisoCreateManyPermisoInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type RolPermisoUpdateManyWithoutPermisoNestedInput = {
    create?: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput> | RolPermisoCreateWithoutPermisoInput[] | RolPermisoUncheckedCreateWithoutPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutPermisoInput | RolPermisoCreateOrConnectWithoutPermisoInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutPermisoInput | RolPermisoUpsertWithWhereUniqueWithoutPermisoInput[]
    createMany?: RolPermisoCreateManyPermisoInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutPermisoInput | RolPermisoUpdateWithWhereUniqueWithoutPermisoInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutPermisoInput | RolPermisoUpdateManyWithWhereWithoutPermisoInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type RolPermisoUncheckedUpdateManyWithoutPermisoNestedInput = {
    create?: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput> | RolPermisoCreateWithoutPermisoInput[] | RolPermisoUncheckedCreateWithoutPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutPermisoInput | RolPermisoCreateOrConnectWithoutPermisoInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutPermisoInput | RolPermisoUpsertWithWhereUniqueWithoutPermisoInput[]
    createMany?: RolPermisoCreateManyPermisoInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutPermisoInput | RolPermisoUpdateWithWhereUniqueWithoutPermisoInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutPermisoInput | RolPermisoUpdateManyWithWhereWithoutPermisoInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type PermisoCreateNestedOneWithoutRolesInput = {
    create?: XOR<PermisoCreateWithoutRolesInput, PermisoUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermisoCreateOrConnectWithoutRolesInput
    connect?: PermisoWhereUniqueInput
  }

  export type RolCreateNestedOneWithoutPermisosInput = {
    create?: XOR<RolCreateWithoutPermisosInput, RolUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: RolCreateOrConnectWithoutPermisosInput
    connect?: RolWhereUniqueInput
  }

  export type PermisoUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<PermisoCreateWithoutRolesInput, PermisoUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermisoCreateOrConnectWithoutRolesInput
    upsert?: PermisoUpsertWithoutRolesInput
    connect?: PermisoWhereUniqueInput
    update?: XOR<XOR<PermisoUpdateToOneWithWhereWithoutRolesInput, PermisoUpdateWithoutRolesInput>, PermisoUncheckedUpdateWithoutRolesInput>
  }

  export type RolUpdateOneRequiredWithoutPermisosNestedInput = {
    create?: XOR<RolCreateWithoutPermisosInput, RolUncheckedCreateWithoutPermisosInput>
    connectOrCreate?: RolCreateOrConnectWithoutPermisosInput
    upsert?: RolUpsertWithoutPermisosInput
    connect?: RolWhereUniqueInput
    update?: XOR<XOR<RolUpdateToOneWithWhereWithoutPermisosInput, RolUpdateWithoutPermisosInput>, RolUncheckedUpdateWithoutPermisosInput>
  }

  export type RolCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<RolCreateWithoutUsuarioInput, RolUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuarioInput
    connect?: RolWhereUniqueInput
  }

  export type RolUpdateOneRequiredWithoutUsuarioNestedInput = {
    create?: XOR<RolCreateWithoutUsuarioInput, RolUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuarioInput
    upsert?: RolUpsertWithoutUsuarioInput
    connect?: RolWhereUniqueInput
    update?: XOR<XOR<RolUpdateToOneWithWhereWithoutUsuarioInput, RolUpdateWithoutUsuarioInput>, RolUncheckedUpdateWithoutUsuarioInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RolPermisoCreateWithoutRolInput = {
    id?: string
    createAt?: Date | string
    permiso: PermisoCreateNestedOneWithoutRolesInput
  }

  export type RolPermisoUncheckedCreateWithoutRolInput = {
    id?: string
    permisoId: string
    createAt?: Date | string
  }

  export type RolPermisoCreateOrConnectWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    create: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput>
  }

  export type RolPermisoCreateManyRolInputEnvelope = {
    data: RolPermisoCreateManyRolInput | RolPermisoCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioCreateWithoutRolInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    DebeCambiar: boolean
  }

  export type UsuarioUncheckedCreateWithoutRolInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    DebeCambiar: boolean
  }

  export type UsuarioCreateOrConnectWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioCreateManyRolInputEnvelope = {
    data: UsuarioCreateManyRolInput | UsuarioCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type RolPermisoUpsertWithWhereUniqueWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    update: XOR<RolPermisoUpdateWithoutRolInput, RolPermisoUncheckedUpdateWithoutRolInput>
    create: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput>
  }

  export type RolPermisoUpdateWithWhereUniqueWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    data: XOR<RolPermisoUpdateWithoutRolInput, RolPermisoUncheckedUpdateWithoutRolInput>
  }

  export type RolPermisoUpdateManyWithWhereWithoutRolInput = {
    where: RolPermisoScalarWhereInput
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyWithoutRolInput>
  }

  export type RolPermisoScalarWhereInput = {
    AND?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
    OR?: RolPermisoScalarWhereInput[]
    NOT?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
    id?: StringFilter<"RolPermiso"> | string
    rolId?: StringFilter<"RolPermiso"> | string
    permisoId?: StringFilter<"RolPermiso"> | string
    createAt?: DateTimeFilter<"RolPermiso"> | Date | string
  }

  export type UsuarioUpsertWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutRolInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutRolInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    createAt?: DateTimeFilter<"Usuario"> | Date | string
    updateAt?: DateTimeFilter<"Usuario"> | Date | string
    activo?: BoolFilter<"Usuario"> | boolean
    rolId?: StringFilter<"Usuario"> | string
    DebeCambiar?: BoolFilter<"Usuario"> | boolean
  }

  export type AcompañanteCreateWithoutInquilinoInput = {
    id?: string
    nombreCompleto: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type AcompañanteUncheckedCreateWithoutInquilinoInput = {
    id?: string
    nombreCompleto: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type AcompañanteCreateOrConnectWithoutInquilinoInput = {
    where: AcompañanteWhereUniqueInput
    create: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput>
  }

  export type AcompañanteCreateManyInquilinoInputEnvelope = {
    data: AcompañanteCreateManyInquilinoInput | AcompañanteCreateManyInquilinoInput[]
    skipDuplicates?: boolean
  }

  export type ContratosCreateWithoutInquilinoInput = {
    id?: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    apartamento: ApartamentoCreateNestedOneWithoutContratosInput
    recibos?: RecibosCreateNestedManyWithoutContratoInput
  }

  export type ContratosUncheckedCreateWithoutInquilinoInput = {
    id?: string
    apartamentoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    recibos?: RecibosUncheckedCreateNestedManyWithoutContratoInput
  }

  export type ContratosCreateOrConnectWithoutInquilinoInput = {
    where: ContratosWhereUniqueInput
    create: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput>
  }

  export type ContratosCreateManyInquilinoInputEnvelope = {
    data: ContratosCreateManyInquilinoInput | ContratosCreateManyInquilinoInput[]
    skipDuplicates?: boolean
  }

  export type AcompañanteUpsertWithWhereUniqueWithoutInquilinoInput = {
    where: AcompañanteWhereUniqueInput
    update: XOR<AcompañanteUpdateWithoutInquilinoInput, AcompañanteUncheckedUpdateWithoutInquilinoInput>
    create: XOR<AcompañanteCreateWithoutInquilinoInput, AcompañanteUncheckedCreateWithoutInquilinoInput>
  }

  export type AcompañanteUpdateWithWhereUniqueWithoutInquilinoInput = {
    where: AcompañanteWhereUniqueInput
    data: XOR<AcompañanteUpdateWithoutInquilinoInput, AcompañanteUncheckedUpdateWithoutInquilinoInput>
  }

  export type AcompañanteUpdateManyWithWhereWithoutInquilinoInput = {
    where: AcompañanteScalarWhereInput
    data: XOR<AcompañanteUpdateManyMutationInput, AcompañanteUncheckedUpdateManyWithoutInquilinoInput>
  }

  export type AcompañanteScalarWhereInput = {
    AND?: AcompañanteScalarWhereInput | AcompañanteScalarWhereInput[]
    OR?: AcompañanteScalarWhereInput[]
    NOT?: AcompañanteScalarWhereInput | AcompañanteScalarWhereInput[]
    id?: StringFilter<"Acompañante"> | string
    nombreCompleto?: StringFilter<"Acompañante"> | string
    inquilinoId?: StringFilter<"Acompañante"> | string
    Parentesco?: StringFilter<"Acompañante"> | string
    createAt?: DateTimeFilter<"Acompañante"> | Date | string
    updateAt?: DateTimeFilter<"Acompañante"> | Date | string
    activo?: BoolFilter<"Acompañante"> | boolean
  }

  export type ContratosUpsertWithWhereUniqueWithoutInquilinoInput = {
    where: ContratosWhereUniqueInput
    update: XOR<ContratosUpdateWithoutInquilinoInput, ContratosUncheckedUpdateWithoutInquilinoInput>
    create: XOR<ContratosCreateWithoutInquilinoInput, ContratosUncheckedCreateWithoutInquilinoInput>
  }

  export type ContratosUpdateWithWhereUniqueWithoutInquilinoInput = {
    where: ContratosWhereUniqueInput
    data: XOR<ContratosUpdateWithoutInquilinoInput, ContratosUncheckedUpdateWithoutInquilinoInput>
  }

  export type ContratosUpdateManyWithWhereWithoutInquilinoInput = {
    where: ContratosScalarWhereInput
    data: XOR<ContratosUpdateManyMutationInput, ContratosUncheckedUpdateManyWithoutInquilinoInput>
  }

  export type ContratosScalarWhereInput = {
    AND?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
    OR?: ContratosScalarWhereInput[]
    NOT?: ContratosScalarWhereInput | ContratosScalarWhereInput[]
    id?: StringFilter<"Contratos"> | string
    inquilinoId?: StringFilter<"Contratos"> | string
    apartamentoId?: StringFilter<"Contratos"> | string
    fechaInicio?: DateTimeFilter<"Contratos"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Contratos"> | Date | string | null
    createAt?: DateTimeFilter<"Contratos"> | Date | string
    updateAt?: DateTimeFilter<"Contratos"> | Date | string
    montoMensual?: DecimalFilter<"Contratos"> | Decimal | DecimalJsLike | number | string
    activo?: BoolFilter<"Contratos"> | boolean
  }

  export type InquilinoCreateWithoutAcompañanteInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Contratos?: ContratosCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoUncheckedCreateWithoutAcompañanteInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Contratos?: ContratosUncheckedCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoCreateOrConnectWithoutAcompañanteInput = {
    where: InquilinoWhereUniqueInput
    create: XOR<InquilinoCreateWithoutAcompañanteInput, InquilinoUncheckedCreateWithoutAcompañanteInput>
  }

  export type InquilinoUpsertWithoutAcompañanteInput = {
    update: XOR<InquilinoUpdateWithoutAcompañanteInput, InquilinoUncheckedUpdateWithoutAcompañanteInput>
    create: XOR<InquilinoCreateWithoutAcompañanteInput, InquilinoUncheckedCreateWithoutAcompañanteInput>
    where?: InquilinoWhereInput
  }

  export type InquilinoUpdateToOneWithWhereWithoutAcompañanteInput = {
    where?: InquilinoWhereInput
    data: XOR<InquilinoUpdateWithoutAcompañanteInput, InquilinoUncheckedUpdateWithoutAcompañanteInput>
  }

  export type InquilinoUpdateWithoutAcompañanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Contratos?: ContratosUpdateManyWithoutInquilinoNestedInput
  }

  export type InquilinoUncheckedUpdateWithoutAcompañanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Contratos?: ContratosUncheckedUpdateManyWithoutInquilinoNestedInput
  }

  export type HabitacionesCreateWithoutApartamentoInput = {
    id?: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
    tipoHabitacion: TiposHabitacionCreateNestedOneWithoutApartamentoInput
  }

  export type HabitacionesUncheckedCreateWithoutApartamentoInput = {
    id?: string
    tipoHabitacionId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type HabitacionesCreateOrConnectWithoutApartamentoInput = {
    where: HabitacionesWhereUniqueInput
    create: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput>
  }

  export type HabitacionesCreateManyApartamentoInputEnvelope = {
    data: HabitacionesCreateManyApartamentoInput | HabitacionesCreateManyApartamentoInput[]
    skipDuplicates?: boolean
  }

  export type ApartamentoServiciosCreateWithoutApartamentoInput = {
    id?: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    servicio: ServiciosCreateNestedOneWithoutApartamentoServiciosInput
  }

  export type ApartamentoServiciosUncheckedCreateWithoutApartamentoInput = {
    id?: string
    servicioId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ApartamentoServiciosCreateOrConnectWithoutApartamentoInput = {
    where: ApartamentoServiciosWhereUniqueInput
    create: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput>
  }

  export type ApartamentoServiciosCreateManyApartamentoInputEnvelope = {
    data: ApartamentoServiciosCreateManyApartamentoInput | ApartamentoServiciosCreateManyApartamentoInput[]
    skipDuplicates?: boolean
  }

  export type ContratosCreateWithoutApartamentoInput = {
    id?: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    inquilino: InquilinoCreateNestedOneWithoutContratosInput
    recibos?: RecibosCreateNestedManyWithoutContratoInput
  }

  export type ContratosUncheckedCreateWithoutApartamentoInput = {
    id?: string
    inquilinoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    recibos?: RecibosUncheckedCreateNestedManyWithoutContratoInput
  }

  export type ContratosCreateOrConnectWithoutApartamentoInput = {
    where: ContratosWhereUniqueInput
    create: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput>
  }

  export type ContratosCreateManyApartamentoInputEnvelope = {
    data: ContratosCreateManyApartamentoInput | ContratosCreateManyApartamentoInput[]
    skipDuplicates?: boolean
  }

  export type HabitacionesUpsertWithWhereUniqueWithoutApartamentoInput = {
    where: HabitacionesWhereUniqueInput
    update: XOR<HabitacionesUpdateWithoutApartamentoInput, HabitacionesUncheckedUpdateWithoutApartamentoInput>
    create: XOR<HabitacionesCreateWithoutApartamentoInput, HabitacionesUncheckedCreateWithoutApartamentoInput>
  }

  export type HabitacionesUpdateWithWhereUniqueWithoutApartamentoInput = {
    where: HabitacionesWhereUniqueInput
    data: XOR<HabitacionesUpdateWithoutApartamentoInput, HabitacionesUncheckedUpdateWithoutApartamentoInput>
  }

  export type HabitacionesUpdateManyWithWhereWithoutApartamentoInput = {
    where: HabitacionesScalarWhereInput
    data: XOR<HabitacionesUpdateManyMutationInput, HabitacionesUncheckedUpdateManyWithoutApartamentoInput>
  }

  export type HabitacionesScalarWhereInput = {
    AND?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
    OR?: HabitacionesScalarWhereInput[]
    NOT?: HabitacionesScalarWhereInput | HabitacionesScalarWhereInput[]
    id?: StringFilter<"Habitaciones"> | string
    apartamentoId?: StringFilter<"Habitaciones"> | string
    tipoHabitacionId?: StringFilter<"Habitaciones"> | string
    cantidad?: IntFilter<"Habitaciones"> | number
    createAt?: DateTimeFilter<"Habitaciones"> | Date | string
    activo?: BoolFilter<"Habitaciones"> | boolean
    updateAt?: DateTimeFilter<"Habitaciones"> | Date | string
  }

  export type ApartamentoServiciosUpsertWithWhereUniqueWithoutApartamentoInput = {
    where: ApartamentoServiciosWhereUniqueInput
    update: XOR<ApartamentoServiciosUpdateWithoutApartamentoInput, ApartamentoServiciosUncheckedUpdateWithoutApartamentoInput>
    create: XOR<ApartamentoServiciosCreateWithoutApartamentoInput, ApartamentoServiciosUncheckedCreateWithoutApartamentoInput>
  }

  export type ApartamentoServiciosUpdateWithWhereUniqueWithoutApartamentoInput = {
    where: ApartamentoServiciosWhereUniqueInput
    data: XOR<ApartamentoServiciosUpdateWithoutApartamentoInput, ApartamentoServiciosUncheckedUpdateWithoutApartamentoInput>
  }

  export type ApartamentoServiciosUpdateManyWithWhereWithoutApartamentoInput = {
    where: ApartamentoServiciosScalarWhereInput
    data: XOR<ApartamentoServiciosUpdateManyMutationInput, ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoInput>
  }

  export type ApartamentoServiciosScalarWhereInput = {
    AND?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
    OR?: ApartamentoServiciosScalarWhereInput[]
    NOT?: ApartamentoServiciosScalarWhereInput | ApartamentoServiciosScalarWhereInput[]
    id?: StringFilter<"ApartamentoServicios"> | string
    apartamentoId?: StringFilter<"ApartamentoServicios"> | string
    servicioId?: StringFilter<"ApartamentoServicios"> | string
    incluido?: BoolFilter<"ApartamentoServicios"> | boolean
    costoAdicional?: DecimalFilter<"ApartamentoServicios"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
    updateAt?: DateTimeFilter<"ApartamentoServicios"> | Date | string
  }

  export type ContratosUpsertWithWhereUniqueWithoutApartamentoInput = {
    where: ContratosWhereUniqueInput
    update: XOR<ContratosUpdateWithoutApartamentoInput, ContratosUncheckedUpdateWithoutApartamentoInput>
    create: XOR<ContratosCreateWithoutApartamentoInput, ContratosUncheckedCreateWithoutApartamentoInput>
  }

  export type ContratosUpdateWithWhereUniqueWithoutApartamentoInput = {
    where: ContratosWhereUniqueInput
    data: XOR<ContratosUpdateWithoutApartamentoInput, ContratosUncheckedUpdateWithoutApartamentoInput>
  }

  export type ContratosUpdateManyWithWhereWithoutApartamentoInput = {
    where: ContratosScalarWhereInput
    data: XOR<ContratosUpdateManyMutationInput, ContratosUncheckedUpdateManyWithoutApartamentoInput>
  }

  export type HabitacionesCreateWithoutTipoHabitacionInput = {
    id?: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
    apartamento: ApartamentoCreateNestedOneWithoutApartamentoInput
  }

  export type HabitacionesUncheckedCreateWithoutTipoHabitacionInput = {
    id?: string
    apartamentoId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type HabitacionesCreateOrConnectWithoutTipoHabitacionInput = {
    where: HabitacionesWhereUniqueInput
    create: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput>
  }

  export type HabitacionesCreateManyTipoHabitacionInputEnvelope = {
    data: HabitacionesCreateManyTipoHabitacionInput | HabitacionesCreateManyTipoHabitacionInput[]
    skipDuplicates?: boolean
  }

  export type HabitacionesUpsertWithWhereUniqueWithoutTipoHabitacionInput = {
    where: HabitacionesWhereUniqueInput
    update: XOR<HabitacionesUpdateWithoutTipoHabitacionInput, HabitacionesUncheckedUpdateWithoutTipoHabitacionInput>
    create: XOR<HabitacionesCreateWithoutTipoHabitacionInput, HabitacionesUncheckedCreateWithoutTipoHabitacionInput>
  }

  export type HabitacionesUpdateWithWhereUniqueWithoutTipoHabitacionInput = {
    where: HabitacionesWhereUniqueInput
    data: XOR<HabitacionesUpdateWithoutTipoHabitacionInput, HabitacionesUncheckedUpdateWithoutTipoHabitacionInput>
  }

  export type HabitacionesUpdateManyWithWhereWithoutTipoHabitacionInput = {
    where: HabitacionesScalarWhereInput
    data: XOR<HabitacionesUpdateManyMutationInput, HabitacionesUncheckedUpdateManyWithoutTipoHabitacionInput>
  }

  export type ApartamentoCreateWithoutApartamentoInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    ApartamentoServicios?: ApartamentoServiciosCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoUncheckedCreateWithoutApartamentoInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    ApartamentoServicios?: ApartamentoServiciosUncheckedCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosUncheckedCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoCreateOrConnectWithoutApartamentoInput = {
    where: ApartamentoWhereUniqueInput
    create: XOR<ApartamentoCreateWithoutApartamentoInput, ApartamentoUncheckedCreateWithoutApartamentoInput>
  }

  export type TiposHabitacionCreateWithoutApartamentoInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type TiposHabitacionUncheckedCreateWithoutApartamentoInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type TiposHabitacionCreateOrConnectWithoutApartamentoInput = {
    where: TiposHabitacionWhereUniqueInput
    create: XOR<TiposHabitacionCreateWithoutApartamentoInput, TiposHabitacionUncheckedCreateWithoutApartamentoInput>
  }

  export type ApartamentoUpsertWithoutApartamentoInput = {
    update: XOR<ApartamentoUpdateWithoutApartamentoInput, ApartamentoUncheckedUpdateWithoutApartamentoInput>
    create: XOR<ApartamentoCreateWithoutApartamentoInput, ApartamentoUncheckedCreateWithoutApartamentoInput>
    where?: ApartamentoWhereInput
  }

  export type ApartamentoUpdateToOneWithWhereWithoutApartamentoInput = {
    where?: ApartamentoWhereInput
    data: XOR<ApartamentoUpdateWithoutApartamentoInput, ApartamentoUncheckedUpdateWithoutApartamentoInput>
  }

  export type ApartamentoUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    ApartamentoServicios?: ApartamentoServiciosUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUpdateManyWithoutApartamentoNestedInput
  }

  export type ApartamentoUncheckedUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    ApartamentoServicios?: ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUncheckedUpdateManyWithoutApartamentoNestedInput
  }

  export type TiposHabitacionUpsertWithoutApartamentoInput = {
    update: XOR<TiposHabitacionUpdateWithoutApartamentoInput, TiposHabitacionUncheckedUpdateWithoutApartamentoInput>
    create: XOR<TiposHabitacionCreateWithoutApartamentoInput, TiposHabitacionUncheckedCreateWithoutApartamentoInput>
    where?: TiposHabitacionWhereInput
  }

  export type TiposHabitacionUpdateToOneWithWhereWithoutApartamentoInput = {
    where?: TiposHabitacionWhereInput
    data: XOR<TiposHabitacionUpdateWithoutApartamentoInput, TiposHabitacionUncheckedUpdateWithoutApartamentoInput>
  }

  export type TiposHabitacionUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TiposHabitacionUncheckedUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ApartamentoServiciosCreateWithoutServicioInput = {
    id?: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    apartamento: ApartamentoCreateNestedOneWithoutApartamentoServiciosInput
  }

  export type ApartamentoServiciosUncheckedCreateWithoutServicioInput = {
    id?: string
    apartamentoId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ApartamentoServiciosCreateOrConnectWithoutServicioInput = {
    where: ApartamentoServiciosWhereUniqueInput
    create: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput>
  }

  export type ApartamentoServiciosCreateManyServicioInputEnvelope = {
    data: ApartamentoServiciosCreateManyServicioInput | ApartamentoServiciosCreateManyServicioInput[]
    skipDuplicates?: boolean
  }

  export type ApartamentoServiciosUpsertWithWhereUniqueWithoutServicioInput = {
    where: ApartamentoServiciosWhereUniqueInput
    update: XOR<ApartamentoServiciosUpdateWithoutServicioInput, ApartamentoServiciosUncheckedUpdateWithoutServicioInput>
    create: XOR<ApartamentoServiciosCreateWithoutServicioInput, ApartamentoServiciosUncheckedCreateWithoutServicioInput>
  }

  export type ApartamentoServiciosUpdateWithWhereUniqueWithoutServicioInput = {
    where: ApartamentoServiciosWhereUniqueInput
    data: XOR<ApartamentoServiciosUpdateWithoutServicioInput, ApartamentoServiciosUncheckedUpdateWithoutServicioInput>
  }

  export type ApartamentoServiciosUpdateManyWithWhereWithoutServicioInput = {
    where: ApartamentoServiciosScalarWhereInput
    data: XOR<ApartamentoServiciosUpdateManyMutationInput, ApartamentoServiciosUncheckedUpdateManyWithoutServicioInput>
  }

  export type ApartamentoCreateWithoutApartamentoServiciosInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoUncheckedCreateWithoutApartamentoServiciosInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesUncheckedCreateNestedManyWithoutApartamentoInput
    Contratos?: ContratosUncheckedCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoCreateOrConnectWithoutApartamentoServiciosInput = {
    where: ApartamentoWhereUniqueInput
    create: XOR<ApartamentoCreateWithoutApartamentoServiciosInput, ApartamentoUncheckedCreateWithoutApartamentoServiciosInput>
  }

  export type ServiciosCreateWithoutApartamentoServiciosInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type ServiciosUncheckedCreateWithoutApartamentoServiciosInput = {
    id?: string
    nombre: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type ServiciosCreateOrConnectWithoutApartamentoServiciosInput = {
    where: ServiciosWhereUniqueInput
    create: XOR<ServiciosCreateWithoutApartamentoServiciosInput, ServiciosUncheckedCreateWithoutApartamentoServiciosInput>
  }

  export type ApartamentoUpsertWithoutApartamentoServiciosInput = {
    update: XOR<ApartamentoUpdateWithoutApartamentoServiciosInput, ApartamentoUncheckedUpdateWithoutApartamentoServiciosInput>
    create: XOR<ApartamentoCreateWithoutApartamentoServiciosInput, ApartamentoUncheckedCreateWithoutApartamentoServiciosInput>
    where?: ApartamentoWhereInput
  }

  export type ApartamentoUpdateToOneWithWhereWithoutApartamentoServiciosInput = {
    where?: ApartamentoWhereInput
    data: XOR<ApartamentoUpdateWithoutApartamentoServiciosInput, ApartamentoUncheckedUpdateWithoutApartamentoServiciosInput>
  }

  export type ApartamentoUpdateWithoutApartamentoServiciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUpdateManyWithoutApartamentoNestedInput
  }

  export type ApartamentoUncheckedUpdateWithoutApartamentoServiciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUncheckedUpdateManyWithoutApartamentoNestedInput
    Contratos?: ContratosUncheckedUpdateManyWithoutApartamentoNestedInput
  }

  export type ServiciosUpsertWithoutApartamentoServiciosInput = {
    update: XOR<ServiciosUpdateWithoutApartamentoServiciosInput, ServiciosUncheckedUpdateWithoutApartamentoServiciosInput>
    create: XOR<ServiciosCreateWithoutApartamentoServiciosInput, ServiciosUncheckedCreateWithoutApartamentoServiciosInput>
    where?: ServiciosWhereInput
  }

  export type ServiciosUpdateToOneWithWhereWithoutApartamentoServiciosInput = {
    where?: ServiciosWhereInput
    data: XOR<ServiciosUpdateWithoutApartamentoServiciosInput, ServiciosUncheckedUpdateWithoutApartamentoServiciosInput>
  }

  export type ServiciosUpdateWithoutApartamentoServiciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiciosUncheckedUpdateWithoutApartamentoServiciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InquilinoCreateWithoutContratosInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Acompañante?: AcompañanteCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoUncheckedCreateWithoutContratosInput = {
    id?: string
    nombreCompleto: string
    dni: string
    numero: string
    correo: string
    fechaNacimiento: Date | string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Acompañante?: AcompañanteUncheckedCreateNestedManyWithoutInquilinoInput
  }

  export type InquilinoCreateOrConnectWithoutContratosInput = {
    where: InquilinoWhereUniqueInput
    create: XOR<InquilinoCreateWithoutContratosInput, InquilinoUncheckedCreateWithoutContratosInput>
  }

  export type ApartamentoCreateWithoutContratosInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesCreateNestedManyWithoutApartamentoInput
    ApartamentoServicios?: ApartamentoServiciosCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoUncheckedCreateWithoutContratosInput = {
    id?: string
    numero: string
    direccion?: string | null
    createAt?: Date | string
    updateAt?: Date | string
    disponible?: boolean
    activo: boolean
    apartamento?: HabitacionesUncheckedCreateNestedManyWithoutApartamentoInput
    ApartamentoServicios?: ApartamentoServiciosUncheckedCreateNestedManyWithoutApartamentoInput
  }

  export type ApartamentoCreateOrConnectWithoutContratosInput = {
    where: ApartamentoWhereUniqueInput
    create: XOR<ApartamentoCreateWithoutContratosInput, ApartamentoUncheckedCreateWithoutContratosInput>
  }

  export type RecibosCreateWithoutContratoInput = {
    id?: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    detalles?: ReciboDetallesCreateNestedManyWithoutReciboInput
  }

  export type RecibosUncheckedCreateWithoutContratoInput = {
    id?: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    detalles?: ReciboDetallesUncheckedCreateNestedManyWithoutReciboInput
  }

  export type RecibosCreateOrConnectWithoutContratoInput = {
    where: RecibosWhereUniqueInput
    create: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput>
  }

  export type RecibosCreateManyContratoInputEnvelope = {
    data: RecibosCreateManyContratoInput | RecibosCreateManyContratoInput[]
    skipDuplicates?: boolean
  }

  export type InquilinoUpsertWithoutContratosInput = {
    update: XOR<InquilinoUpdateWithoutContratosInput, InquilinoUncheckedUpdateWithoutContratosInput>
    create: XOR<InquilinoCreateWithoutContratosInput, InquilinoUncheckedCreateWithoutContratosInput>
    where?: InquilinoWhereInput
  }

  export type InquilinoUpdateToOneWithWhereWithoutContratosInput = {
    where?: InquilinoWhereInput
    data: XOR<InquilinoUpdateWithoutContratosInput, InquilinoUncheckedUpdateWithoutContratosInput>
  }

  export type InquilinoUpdateWithoutContratosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Acompañante?: AcompañanteUpdateManyWithoutInquilinoNestedInput
  }

  export type InquilinoUncheckedUpdateWithoutContratosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Acompañante?: AcompañanteUncheckedUpdateManyWithoutInquilinoNestedInput
  }

  export type ApartamentoUpsertWithoutContratosInput = {
    update: XOR<ApartamentoUpdateWithoutContratosInput, ApartamentoUncheckedUpdateWithoutContratosInput>
    create: XOR<ApartamentoCreateWithoutContratosInput, ApartamentoUncheckedCreateWithoutContratosInput>
    where?: ApartamentoWhereInput
  }

  export type ApartamentoUpdateToOneWithWhereWithoutContratosInput = {
    where?: ApartamentoWhereInput
    data: XOR<ApartamentoUpdateWithoutContratosInput, ApartamentoUncheckedUpdateWithoutContratosInput>
  }

  export type ApartamentoUpdateWithoutContratosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUpdateManyWithoutApartamentoNestedInput
    ApartamentoServicios?: ApartamentoServiciosUpdateManyWithoutApartamentoNestedInput
  }

  export type ApartamentoUncheckedUpdateWithoutContratosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: HabitacionesUncheckedUpdateManyWithoutApartamentoNestedInput
    ApartamentoServicios?: ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoNestedInput
  }

  export type RecibosUpsertWithWhereUniqueWithoutContratoInput = {
    where: RecibosWhereUniqueInput
    update: XOR<RecibosUpdateWithoutContratoInput, RecibosUncheckedUpdateWithoutContratoInput>
    create: XOR<RecibosCreateWithoutContratoInput, RecibosUncheckedCreateWithoutContratoInput>
  }

  export type RecibosUpdateWithWhereUniqueWithoutContratoInput = {
    where: RecibosWhereUniqueInput
    data: XOR<RecibosUpdateWithoutContratoInput, RecibosUncheckedUpdateWithoutContratoInput>
  }

  export type RecibosUpdateManyWithWhereWithoutContratoInput = {
    where: RecibosScalarWhereInput
    data: XOR<RecibosUpdateManyMutationInput, RecibosUncheckedUpdateManyWithoutContratoInput>
  }

  export type RecibosScalarWhereInput = {
    AND?: RecibosScalarWhereInput | RecibosScalarWhereInput[]
    OR?: RecibosScalarWhereInput[]
    NOT?: RecibosScalarWhereInput | RecibosScalarWhereInput[]
    id?: StringFilter<"Recibos"> | string
    contratoId?: StringFilter<"Recibos"> | string
    fechaPago?: DateTimeFilter<"Recibos"> | Date | string
    total?: DecimalFilter<"Recibos"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"Recibos"> | Date | string
    updateAt?: DateTimeFilter<"Recibos"> | Date | string
  }

  export type ContratosCreateWithoutRecibosInput = {
    id?: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    inquilino: InquilinoCreateNestedOneWithoutContratosInput
    apartamento: ApartamentoCreateNestedOneWithoutContratosInput
  }

  export type ContratosUncheckedCreateWithoutRecibosInput = {
    id?: string
    inquilinoId: string
    apartamentoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
  }

  export type ContratosCreateOrConnectWithoutRecibosInput = {
    where: ContratosWhereUniqueInput
    create: XOR<ContratosCreateWithoutRecibosInput, ContratosUncheckedCreateWithoutRecibosInput>
  }

  export type ReciboDetallesCreateWithoutReciboInput = {
    id?: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ReciboDetallesUncheckedCreateWithoutReciboInput = {
    id?: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ReciboDetallesCreateOrConnectWithoutReciboInput = {
    where: ReciboDetallesWhereUniqueInput
    create: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput>
  }

  export type ReciboDetallesCreateManyReciboInputEnvelope = {
    data: ReciboDetallesCreateManyReciboInput | ReciboDetallesCreateManyReciboInput[]
    skipDuplicates?: boolean
  }

  export type ContratosUpsertWithoutRecibosInput = {
    update: XOR<ContratosUpdateWithoutRecibosInput, ContratosUncheckedUpdateWithoutRecibosInput>
    create: XOR<ContratosCreateWithoutRecibosInput, ContratosUncheckedCreateWithoutRecibosInput>
    where?: ContratosWhereInput
  }

  export type ContratosUpdateToOneWithWhereWithoutRecibosInput = {
    where?: ContratosWhereInput
    data: XOR<ContratosUpdateWithoutRecibosInput, ContratosUncheckedUpdateWithoutRecibosInput>
  }

  export type ContratosUpdateWithoutRecibosInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    inquilino?: InquilinoUpdateOneRequiredWithoutContratosNestedInput
    apartamento?: ApartamentoUpdateOneRequiredWithoutContratosNestedInput
  }

  export type ContratosUncheckedUpdateWithoutRecibosInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReciboDetallesUpsertWithWhereUniqueWithoutReciboInput = {
    where: ReciboDetallesWhereUniqueInput
    update: XOR<ReciboDetallesUpdateWithoutReciboInput, ReciboDetallesUncheckedUpdateWithoutReciboInput>
    create: XOR<ReciboDetallesCreateWithoutReciboInput, ReciboDetallesUncheckedCreateWithoutReciboInput>
  }

  export type ReciboDetallesUpdateWithWhereUniqueWithoutReciboInput = {
    where: ReciboDetallesWhereUniqueInput
    data: XOR<ReciboDetallesUpdateWithoutReciboInput, ReciboDetallesUncheckedUpdateWithoutReciboInput>
  }

  export type ReciboDetallesUpdateManyWithWhereWithoutReciboInput = {
    where: ReciboDetallesScalarWhereInput
    data: XOR<ReciboDetallesUpdateManyMutationInput, ReciboDetallesUncheckedUpdateManyWithoutReciboInput>
  }

  export type ReciboDetallesScalarWhereInput = {
    AND?: ReciboDetallesScalarWhereInput | ReciboDetallesScalarWhereInput[]
    OR?: ReciboDetallesScalarWhereInput[]
    NOT?: ReciboDetallesScalarWhereInput | ReciboDetallesScalarWhereInput[]
    id?: StringFilter<"ReciboDetalles"> | string
    reciboId?: StringFilter<"ReciboDetalles"> | string
    descripcion?: StringFilter<"ReciboDetalles"> | string
    monto?: DecimalFilter<"ReciboDetalles"> | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
    updateAt?: DateTimeFilter<"ReciboDetalles"> | Date | string
  }

  export type RecibosCreateWithoutDetallesInput = {
    id?: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
    contrato: ContratosCreateNestedOneWithoutRecibosInput
  }

  export type RecibosUncheckedCreateWithoutDetallesInput = {
    id?: string
    contratoId: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type RecibosCreateOrConnectWithoutDetallesInput = {
    where: RecibosWhereUniqueInput
    create: XOR<RecibosCreateWithoutDetallesInput, RecibosUncheckedCreateWithoutDetallesInput>
  }

  export type RecibosUpsertWithoutDetallesInput = {
    update: XOR<RecibosUpdateWithoutDetallesInput, RecibosUncheckedUpdateWithoutDetallesInput>
    create: XOR<RecibosCreateWithoutDetallesInput, RecibosUncheckedCreateWithoutDetallesInput>
    where?: RecibosWhereInput
  }

  export type RecibosUpdateToOneWithWhereWithoutDetallesInput = {
    where?: RecibosWhereInput
    data: XOR<RecibosUpdateWithoutDetallesInput, RecibosUncheckedUpdateWithoutDetallesInput>
  }

  export type RecibosUpdateWithoutDetallesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contrato?: ContratosUpdateOneRequiredWithoutRecibosNestedInput
  }

  export type RecibosUncheckedUpdateWithoutDetallesInput = {
    id?: StringFieldUpdateOperationsInput | string
    contratoId?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoCreateWithoutPermisoInput = {
    id?: string
    createAt?: Date | string
    rol: RolCreateNestedOneWithoutPermisosInput
  }

  export type RolPermisoUncheckedCreateWithoutPermisoInput = {
    id?: string
    rolId: string
    createAt?: Date | string
  }

  export type RolPermisoCreateOrConnectWithoutPermisoInput = {
    where: RolPermisoWhereUniqueInput
    create: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput>
  }

  export type RolPermisoCreateManyPermisoInputEnvelope = {
    data: RolPermisoCreateManyPermisoInput | RolPermisoCreateManyPermisoInput[]
    skipDuplicates?: boolean
  }

  export type RolPermisoUpsertWithWhereUniqueWithoutPermisoInput = {
    where: RolPermisoWhereUniqueInput
    update: XOR<RolPermisoUpdateWithoutPermisoInput, RolPermisoUncheckedUpdateWithoutPermisoInput>
    create: XOR<RolPermisoCreateWithoutPermisoInput, RolPermisoUncheckedCreateWithoutPermisoInput>
  }

  export type RolPermisoUpdateWithWhereUniqueWithoutPermisoInput = {
    where: RolPermisoWhereUniqueInput
    data: XOR<RolPermisoUpdateWithoutPermisoInput, RolPermisoUncheckedUpdateWithoutPermisoInput>
  }

  export type RolPermisoUpdateManyWithWhereWithoutPermisoInput = {
    where: RolPermisoScalarWhereInput
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyWithoutPermisoInput>
  }

  export type PermisoCreateWithoutRolesInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type PermisoUncheckedCreateWithoutRolesInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type PermisoCreateOrConnectWithoutRolesInput = {
    where: PermisoWhereUniqueInput
    create: XOR<PermisoCreateWithoutRolesInput, PermisoUncheckedCreateWithoutRolesInput>
  }

  export type RolCreateWithoutPermisosInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Usuario?: UsuarioCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateWithoutPermisosInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    Usuario?: UsuarioUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolCreateOrConnectWithoutPermisosInput = {
    where: RolWhereUniqueInput
    create: XOR<RolCreateWithoutPermisosInput, RolUncheckedCreateWithoutPermisosInput>
  }

  export type PermisoUpsertWithoutRolesInput = {
    update: XOR<PermisoUpdateWithoutRolesInput, PermisoUncheckedUpdateWithoutRolesInput>
    create: XOR<PermisoCreateWithoutRolesInput, PermisoUncheckedCreateWithoutRolesInput>
    where?: PermisoWhereInput
  }

  export type PermisoUpdateToOneWithWhereWithoutRolesInput = {
    where?: PermisoWhereInput
    data: XOR<PermisoUpdateWithoutRolesInput, PermisoUncheckedUpdateWithoutRolesInput>
  }

  export type PermisoUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PermisoUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolUpsertWithoutPermisosInput = {
    update: XOR<RolUpdateWithoutPermisosInput, RolUncheckedUpdateWithoutPermisosInput>
    create: XOR<RolCreateWithoutPermisosInput, RolUncheckedCreateWithoutPermisosInput>
    where?: RolWhereInput
  }

  export type RolUpdateToOneWithWhereWithoutPermisosInput = {
    where?: RolWhereInput
    data: XOR<RolUpdateWithoutPermisosInput, RolUncheckedUpdateWithoutPermisosInput>
  }

  export type RolUpdateWithoutPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Usuario?: UsuarioUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateWithoutPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Usuario?: UsuarioUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolCreateWithoutUsuarioInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    permisos?: RolPermisoCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateWithoutUsuarioInput = {
    id?: string
    nombre: string
    descripcion: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    permisos?: RolPermisoUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolCreateOrConnectWithoutUsuarioInput = {
    where: RolWhereUniqueInput
    create: XOR<RolCreateWithoutUsuarioInput, RolUncheckedCreateWithoutUsuarioInput>
  }

  export type RolUpsertWithoutUsuarioInput = {
    update: XOR<RolUpdateWithoutUsuarioInput, RolUncheckedUpdateWithoutUsuarioInput>
    create: XOR<RolCreateWithoutUsuarioInput, RolUncheckedCreateWithoutUsuarioInput>
    where?: RolWhereInput
  }

  export type RolUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: RolWhereInput
    data: XOR<RolUpdateWithoutUsuarioInput, RolUncheckedUpdateWithoutUsuarioInput>
  }

  export type RolUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    permisos?: RolPermisoUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    permisos?: RolPermisoUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolPermisoCreateManyRolInput = {
    id?: string
    permisoId: string
    createAt?: Date | string
  }

  export type UsuarioCreateManyRolInput = {
    id?: string
    nombre: string
    email: string
    password: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
    DebeCambiar: boolean
  }

  export type RolPermisoUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permiso?: PermisoUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolPermisoUncheckedUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    permisoId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoUncheckedUpdateManyWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    permisoId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioUncheckedUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioUncheckedUpdateManyWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    DebeCambiar?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteCreateManyInquilinoInput = {
    id?: string
    nombreCompleto: string
    Parentesco: string
    createAt?: Date | string
    updateAt?: Date | string
    activo: boolean
  }

  export type ContratosCreateManyInquilinoInput = {
    id?: string
    apartamentoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
  }

  export type AcompañanteUpdateWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteUncheckedUpdateWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcompañanteUncheckedUpdateManyWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombreCompleto?: StringFieldUpdateOperationsInput | string
    Parentesco?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContratosUpdateWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    apartamento?: ApartamentoUpdateOneRequiredWithoutContratosNestedInput
    recibos?: RecibosUpdateManyWithoutContratoNestedInput
  }

  export type ContratosUncheckedUpdateWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    recibos?: RecibosUncheckedUpdateManyWithoutContratoNestedInput
  }

  export type ContratosUncheckedUpdateManyWithoutInquilinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HabitacionesCreateManyApartamentoInput = {
    id?: string
    tipoHabitacionId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type ApartamentoServiciosCreateManyApartamentoInput = {
    id?: string
    servicioId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ContratosCreateManyApartamentoInput = {
    id?: string
    inquilinoId: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    createAt?: Date | string
    updateAt?: Date | string
    montoMensual?: Decimal | DecimalJsLike | number | string
    activo?: boolean
  }

  export type HabitacionesUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoHabitacion?: TiposHabitacionUpdateOneRequiredWithoutApartamentoNestedInput
  }

  export type HabitacionesUncheckedUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoHabitacionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HabitacionesUncheckedUpdateManyWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoHabitacionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicio?: ServiciosUpdateOneRequiredWithoutApartamentoServiciosNestedInput
  }

  export type ApartamentoServiciosUncheckedUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    servicioId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosUncheckedUpdateManyWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    servicioId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContratosUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    inquilino?: InquilinoUpdateOneRequiredWithoutContratosNestedInput
    recibos?: RecibosUpdateManyWithoutContratoNestedInput
  }

  export type ContratosUncheckedUpdateWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    recibos?: RecibosUncheckedUpdateManyWithoutContratoNestedInput
  }

  export type ContratosUncheckedUpdateManyWithoutApartamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquilinoId?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    montoMensual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HabitacionesCreateManyTipoHabitacionInput = {
    id?: string
    apartamentoId: string
    cantidad?: number
    createAt?: Date | string
    activo: boolean
    updateAt?: Date | string
  }

  export type HabitacionesUpdateWithoutTipoHabitacionInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apartamento?: ApartamentoUpdateOneRequiredWithoutApartamentoNestedInput
  }

  export type HabitacionesUncheckedUpdateWithoutTipoHabitacionInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HabitacionesUncheckedUpdateManyWithoutTipoHabitacionInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosCreateManyServicioInput = {
    id?: string
    apartamentoId: string
    incluido?: boolean
    costoAdicional?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ApartamentoServiciosUpdateWithoutServicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apartamento?: ApartamentoUpdateOneRequiredWithoutApartamentoServiciosNestedInput
  }

  export type ApartamentoServiciosUncheckedUpdateWithoutServicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApartamentoServiciosUncheckedUpdateManyWithoutServicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    apartamentoId?: StringFieldUpdateOperationsInput | string
    incluido?: BoolFieldUpdateOperationsInput | boolean
    costoAdicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecibosCreateManyContratoInput = {
    id?: string
    fechaPago: Date | string
    total?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type RecibosUpdateWithoutContratoInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: ReciboDetallesUpdateManyWithoutReciboNestedInput
  }

  export type RecibosUncheckedUpdateWithoutContratoInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: ReciboDetallesUncheckedUpdateManyWithoutReciboNestedInput
  }

  export type RecibosUncheckedUpdateManyWithoutContratoInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaPago?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesCreateManyReciboInput = {
    id?: string
    descripcion: string
    monto?: Decimal | DecimalJsLike | number | string
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ReciboDetallesUpdateWithoutReciboInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesUncheckedUpdateWithoutReciboInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReciboDetallesUncheckedUpdateManyWithoutReciboInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoCreateManyPermisoInput = {
    id?: string
    rolId: string
    createAt?: Date | string
  }

  export type RolPermisoUpdateWithoutPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rol?: RolUpdateOneRequiredWithoutPermisosNestedInput
  }

  export type RolPermisoUncheckedUpdateWithoutPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoUncheckedUpdateManyWithoutPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}