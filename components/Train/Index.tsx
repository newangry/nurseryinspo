import { Flex, Box } from "@mantine/core";
import Selector from "./Selectors";

const Train = () => {
    return (
        <Flex
            mt={30}
        >
            <Box>
                {/* <Sources /> */}
                <Selector />
            </Box>
        </Flex>
    )
}

export default Train;