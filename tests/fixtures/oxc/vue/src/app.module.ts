function Module(_metadata: object): ClassDecorator {
  return () => undefined;
}

@Module({})
export class AppModule {}
