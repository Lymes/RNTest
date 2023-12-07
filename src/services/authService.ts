import Topology from './topology.json';

export type TopologyModule = {
  id: string;
  areaId?: string;
  name: string;
  children?: TopologyModule[];
  parent?: TopologyModule;
};

export type AuthData = {
  topology: TopologyModule[];
  username: string;
};

const signIn = (username: string, _password: string): Promise<AuthData> => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below
  return new Promise(resolve => {
    let topology: TopologyModule[] = JSON.parse(JSON.stringify(Topology));
    const childrenMap = topology.reduce(
      (
        map: Map<string | undefined, TopologyModule[]>,
        module: TopologyModule,
      ) => {
        map.set(module.areaId, [...(map.get(module.areaId) || []), module]);
        return map;
      },
      new Map<string | undefined, TopologyModule[]>(),
    );
    topology.forEach(module => {
      module.children = childrenMap.get(module.id);
      module.children?.forEach(child => {
        child.parent = module;
      });
    });

    setTimeout(() => {
      resolve({
        topology: topology,
        username: username,
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};
