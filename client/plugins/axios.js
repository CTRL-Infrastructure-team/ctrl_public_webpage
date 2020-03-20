import axios from "axios";

export default function({ app }) {
  app.$axios.asyncGet = async ref => {
    return process.server
      ? await app.$axios.$get(ref)
      : axios.get(ref).then(res => res.data);
  };
}
