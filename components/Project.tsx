import { Badge, Box, Text, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import styles from './Project.module.css';

const Project = ({
  project,
  projectHoverBackground,
  prefersReducedMotion,
  badgeColor,
}: {
  project: any;
  projectHoverBackground: string;
  prefersReducedMotion: boolean;
  badgeColor: string;
}) => {
  const [projectDescription, setProjectDescription] = useState(
    <Text>{project.description}</Text>,
  );
  useEffect(
    () =>
      setProjectDescription(
        <ReactMarkdown
          linkTarget="_blank"
          className={styles.projectDescription}
        >
          {project.description}
        </ReactMarkdown>,
      ),
    [],
  );
  return (
    <a
      key={project.id}
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        borderTop={'lg'}
        roundedTop={'lg'}
        sx={{ cursor: 'pointer' }}
        _hover={{ bg: projectHoverBackground }}
        _focus={{ boxShadow: 'outline' }}
        _active={{ boxShadow: 'outline' }}
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0 },
          }}
          className="imagineHavingJSDisabledIn2022"
          style={{}}
        >
          {/* <LazyLoadImage */}
          {/*   alt={project.description} */}
          {/*   src={project.avatar_url} */}
          {/*   height="auto" */}
          {/*   width="100%" */}
          {/* /> */}

          <Box p="6">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              noOfLines={1}
            >
              {project.name}
            </Box>
            <Box alignItems="baseline">
              {project.topics.map((topic: string) => (
                <Badge
                  key={`${project.id}-${topic}`}
                  borderRadius="full"
                  px="2"
                  mr={1}
                  color={badgeColor}
                >
                  {topic}
                </Badge>
              ))}
            </Box>
            <Divider mt="1" mb="1" />
            <Box>{projectDescription}</Box>
          </Box>
        </motion.div>
      </Box>
    </a>
  );
};

export default Project;
