# 🌩 Hello storm 🌩

Usando [`index.test.js`](./index.test.js) para detectar los cambios en la api.

Ejemplo: No tiene las propiedades que espera (`number`, `title`, `supercoco`) y `duration` no tiene el tipo correcto:

![imagen](https://github.com/yurigo/tormenta-terrible/assets/5684699/4a4aea5b-4063-44e6-9f51-0d89146f1587)

<br />

Ejemplo: No tiene los tipos que espera (`duration`):

![imagen](https://github.com/yurigo/tormenta-terrible/assets/5684699/b0aea6f1-12f2-4598-b2eb-9738569aa398)

<br />

Ejemplo: Ha pasado correctamente:

![imagen](https://github.com/yurigo/tormenta-terrible/assets/5684699/64e53bfe-1c63-4957-a77f-d14c213817b0)

<br />

Errores detectados:

- `number` no se encuentra en el objeto
- `title` no se encuentra en el objeto
- `duration` no se encuentra en el objeto
- el tipo de `number` no es correcto
- el tipo de `duration` no es correcto
- `supercoco` existe en el objeto (y no debería?)

<hr />

Se han propuesto dos soluciones:

**Brute force**

https://github.com/yurigo/tormenta-terrible/tree/reload-until-ok

**Reverse Engineer Fixing Algorithm**

https://github.com/yurigo/tormenta-terrible/tree/master